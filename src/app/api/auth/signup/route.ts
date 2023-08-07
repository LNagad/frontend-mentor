import { NextResponse } from "next/server";
import { connectDB } from "@/libs";
import { ExtendedError  } from '@/interfaces';
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();

  try {

    if ( !password || password.length < 6 ) {
      const error: ExtendedError = new Error('Password must be at least 6 characters');
      error.status = 400;
      throw error;
    }
  
    await connectDB();
    
    const userFound = await User.findOne({ email });

    if (userFound) {
      const error: ExtendedError = new Error('Email already exists');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hashSync(password);

    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname
    });

  } catch (error) {
    if (error instanceof Error) {
      const customError = error as ExtendedError;
      return NextResponse.json(
        { message: customError.message },
        { status: customError?.status || 400 }
      );
    }

  }
}
