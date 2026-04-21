import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CONTENT_TYPE_TO_TAG: Record<string, string> = {
  post: "blogs",
  blogs: "blogs",
  blog: "blogs",
  product: "products",
  products: "products",
  project: "projects",
  projects: "projects",
  package: "packages",
  packages: "packages",
};

const LANGS = ["ar", "en"] as const;

function getSecretFromRequest(req: NextRequest): string | null {
  return (
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-revalidate-secret") ||
    null
  );
}

function normalizeType(input?: string | null): string | null {
  if (!input) return null;
  return input.trim().toLowerCase();
}

function safeSlug(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function revalidateBasePaths() {
  revalidatePath("/sitemap.xml");
  revalidatePath("/ar");
  revalidatePath("/en");
  LANGS.forEach((lang) => {
    revalidatePath(`/${lang}/blog`);
    revalidatePath(`/${lang}/products`);
    revalidatePath(`/${lang}/projects`);
    revalidatePath(`/${lang}/packages`);
  });
}

function revalidateByType(type: string | null, slug: string | null) {
  if (!type) {
    ["blogs", "products", "projects", "packages"].forEach((tag) => revalidateTag(tag, "max"));
    return;
  }

  const baseTag = CONTENT_TYPE_TO_TAG[type];
  if (!baseTag) {
    ["blogs", "products", "projects", "packages"].forEach((tag) => revalidateTag(tag, "max"));
    return;
  }

  revalidateTag(baseTag, "max");

  if (!slug) return;
  if (baseTag === "blogs") revalidateTag(`blog-${slug}`, "max");
  if (baseTag === "products") revalidateTag(`product-${slug}`, "max");
  if (baseTag === "projects") revalidateTag(`project-${slug}`, "max");
  if (baseTag === "packages") revalidateTag(`package-${slug}`, "max");
}

function revalidateByPath(type: string | null, slug: string | null) {
  if (!type || !slug) return;
  LANGS.forEach((lang) => {
    if (CONTENT_TYPE_TO_TAG[type] === "blogs") revalidatePath(`/${lang}/blog/${slug}`);
    if (CONTENT_TYPE_TO_TAG[type] === "products") revalidatePath(`/${lang}/products/${slug}`);
    if (CONTENT_TYPE_TO_TAG[type] === "projects") revalidatePath(`/${lang}/projects/${slug}`);
    if (CONTENT_TYPE_TO_TAG[type] === "packages") revalidatePath(`/${lang}/packages/${slug}`);
  });
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;
  const providedSecret = getSecretFromRequest(req);

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  let payload: { type?: string; slug?: string } = {};
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  const type = normalizeType(payload.type || req.nextUrl.searchParams.get("type"));
  const slug = safeSlug(payload.slug || req.nextUrl.searchParams.get("slug"));

  revalidateByType(type, slug);
  revalidateByPath(type, slug);
  revalidateBasePaths();

  return NextResponse.json({
    revalidated: true,
    type: type || "all",
    slug,
  });
}
