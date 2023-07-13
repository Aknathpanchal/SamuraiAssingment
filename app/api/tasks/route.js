import { dbConnect } from "@/utils/connection/connection";
import { Todo } from "@/utils/model/model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const seatstatus = await Todo.find();
    return NextResponse.json({ seatstatus }, { status: 200 });
  } catch (error) {
    console.log("GET  error:", error);
    return NextResponse.json(
      { massage: `request failed due to ${error.massage} ` },
      { status: 404 }
    );
  }
};


export const POST = async (request) => {
  await dbConnect();
  const body= await request.json()
  try {
    const tasks = await Todo.create(body);
    return NextResponse.json( tasks , { status: 200 });
  } catch (error) {
    console.log("GET  error:", error);
    return NextResponse.json(
      { massage: `request failed due to ${error.massage} ` },
      { status: 404 }
    );
  }
};