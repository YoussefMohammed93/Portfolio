import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env");
}

let client;
let clientPromise = (client = new MongoClient(uri)).connect();

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const db = (await clientPromise).db("mydatabase");
    const projectsCollection = db.collection("projects");

    const project = await projectsCollection.findOne({ _id: new ObjectId(id) });
    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ ...project, id: project._id.toString() }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching project by id:", error);
    return new Response(JSON.stringify({ error: "Error fetching project" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { title, category, description, client, technologies, images, href } =
      await req.json();
    const db = (await clientPromise).db("mydatabase");
    const projectsCollection = db.collection("projects");

    const newProject = {
      title,
      category,
      description,
      client,
      technologies,
      images,
      href,
    };

    const result = await projectsCollection.insertOne(newProject);

    return new Response(
      JSON.stringify({
        message: "Project added",
        project: { ...newProject, id: result.insertedId.toString() },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding project:", error);
    return new Response(JSON.stringify({ error: "Error adding project" }), {
      status: 500,
    });
  }
}
