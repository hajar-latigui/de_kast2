
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../Firebase/Firebase';

  const fetchData = async () => {
      try {
        const q = query(
          collection(db, "yoga")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return data;
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching data");
      }
    };

    const addData = async (title,members, startdate, enddate ) =>{
      await addDoc(doc(db,title),{
        title : title,
        members: [members],
        startDate : startdate,
        endDate: enddate,
      });
    }
    const updateData = async (title, id,members, startdate, enddate ) =>{
      await updateDoc(doc(db,title,id),{
        title : title,
        members : [members],
        startDate : startdate,
        endDate: enddate,
      });
    }

    const deleteData = async (title, id) =>{
      await deleteDoc(doc(db, db,title,id));
    }

  
export {fetchData,addData,updateData,deleteData}
  