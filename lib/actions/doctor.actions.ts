'use server';

import { revalidatePath } from 'next/cache';
import Doctor from '../database/models/doctor.model';
import { connectToDatabase } from '../database/mongoose';
import { handleError } from '../utils';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { error } from 'console';

// CREATE
export async function createDoctor(doctor: CreateDoctorParams) {
  try {
    await connectToDatabase();
    console.log('doctor created');
    const newDoctor = await Doctor.create(doctor);

    return JSON.parse(JSON.stringify(newDoctor));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getDoctorById(doctorId: string) {
  try {
    await connectToDatabase();
    const doctor = await Doctor.findById(doctorId).populate('user');
    console.log('get doctor by id',doctor);
    if (!doctor) throw new Error('Doctor not found');

    return JSON.parse(JSON.stringify(doctor));
  } catch (error) {
    handleError(error);
  }
}

export async function getDoctorByUserId(userId: string){
  try{
    await connectToDatabase();
    const doctor = await Doctor.findOne({ user : userId });
    console.log("get doctor by user id");
    if(!doctor) throw new Error('Doctor Not Found');
      
    return JSON.parse(JSON.stringify(doctor));
  }catch(error) {
    handleError(error)
  }
}

// UPDATE
export async function updateDoctor(doctorId: string, doctorData: UpdateDoctorParams) {
  try {
    await connectToDatabase();
    console.log('doctor update successful');

    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, doctorData, {
      new: true,
    });

    if (!updatedDoctor) throw new Error('Doctor update failed');

    return JSON.parse(JSON.stringify(updatedDoctor));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteDoctor(doctorId: string) {
  try {
    await connectToDatabase();
    console.log('doctor deleted');
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    revalidatePath('/doctors');
    return deletedDoctor ? JSON.parse(JSON.stringify(deletedDoctor)) : null;
  } catch (error) {
    handleError(error);
  }
}

// SEARCH
export async function searchDoctors(query: string) {
  try {
    await connectToDatabase();
    console.log(query);

    const filter = query
      ? {
          $or: [
            { 'user.firstName': { $regex: query, $options: 'i' } },
            { 'user.lastName': { $regex: query, $options: 'i' } },
            { 'user.username': { $regex: query, $options: 'i' } },
            { specializations: { $regex: query, $options: 'i' } },
            ...(mongoose.Types.ObjectId.isValid(query) ? [{ _id: query }] : []),
          ].filter(Boolean),
        }
      : {};

    const results = await Doctor.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $match: filter },
      { $limit: 20 },
    ]);

    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Internal Server Error');
  }
  }