import { dbConnect } from "../../../../utils/connection/connection";
import { NextResponse } from "next/server";
import { Todo } from "../../../../utils/model/model";

export async function PATCH(request, { params }) {
    await dbConnect();
    const id = params.id;
    const body=await request.json()
    console.log(body)
    console.log(params)
    try{
      const todo = await Todo.findByIdAndUpdate(id,body);
    console.log("GET  id:", id);
    return NextResponse.json(todo);
    }catch(error){
      return NextResponse.json(error.massage);
    }
    
  } 

  export async function DELETE(request, { params }) {
    await dbConnect();
    const id = params.id;
    try{
      const todo = await Todo.findByIdAndDelete(id);
      console.log("GET  id:", id);
      return NextResponse.json(todo);
    }catch(error){
      return NextResponse.json(error.massage);
    }
   
  } 

  export async function GET(request, { params }) {
    await dbConnect();
    const id = params.id;
    try{
      const todo = await Todo.findById(id);
      console.log("GET  id:", id);
      return NextResponse.json(todo);
    }catch(error){
      return NextResponse.json(error.massage);
    }
   
  } 