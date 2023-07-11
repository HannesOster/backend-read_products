import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id);
    if (!product) {
      response.status(404).json({ status: "Joke not found." });
      return;
    }
    response.status(200).json(product);
    return;
  }
  request.status(405).json({ status: "Request method not implemented." });
}

// export default async function handler(request, response) {
//   await dbConnect();

//   if (request.method === "GET") {
//     const products = await Product.find();
//     response.status(200).json(products);
//     return;
//   }

//   return request.status(405).json({ status: "Request method not implemented" });
// }
