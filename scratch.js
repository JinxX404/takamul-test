process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const query = `
    query GetProductDetails($id: ID!) {
      takamulproduct(id: $id, idType: SLUG) {
        id
        databaseId
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productcategories {
          nodes {
            name
            slug
          }
        }
        brand
        productPrice
        salePrice
        quickFeatures
        uses
        productGallery {
          nodes {
            sourceUrl
            altText
          }
        }
        techSpecs {
          nodes {
            key
            value
          }
        }
        extraSections {
          nodes {
            title
            content
          }
        }
        relatedProducts {
          nodes {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            productPrice
            salePrice
          }
        }
      }
    }
`;

async function run() {
  const res = await fetch('https://api.takamulsecurity.sa/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: "كاميرا-داخلية-hd" } })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

run();
