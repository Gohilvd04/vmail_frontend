import { collection, getDocs, query, where, setDoc, doc, updateDoc, increment, deleteDoc, orderBy } from 'firebase/firestore';
import { auth, db } from './config';
import { COLLECTIONS } from './collections';


// ADD NOTIFICATION

export const addNotification = async (notifyData) =>
  new Promise((resolve) => {
    const notifyDocumentReference = doc(collection(db, COLLECTIONS.NOTIFICATION));
    setDoc(notifyDocumentReference, {
      ...notifyData,
      createdAt: new Date(),
      // createdBy: auth?.currentUser?.uid,
      createdBy: notifyData.user.name,
      id: notifyDocumentReference.id,
    })
      .then(() => resolve(true))
      .catch(() => {
        resolve(false);
        //   console.log('error', error);
      });
  });


// DELETE NOTIFICATION

export const deleteNotification = async (documentId) =>
  new Promise((resolve) => {
    deleteDoc(doc(db, COLLECTIONS.NOTIFICATION, documentId))
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });


// GET NOTIFICATION BY ID

export const getNotification = async (userEmail) =>
  new Promise((resolve) => {
    const getNotificationQuery = query(collection(db, COLLECTIONS.NOTIFICATION), where('to', '==', userEmail), orderBy('createdAt', 'asc'));
    getDocs(getNotificationQuery)
      .then((response) => {
        const arr = [];
        response.docs.forEach((doc) => {
          arr.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        if (arr.length > 0) resolve(arr[0]);
        else resolve(null);
      })
      .catch(() => {
        resolve(null);
      });
  });


// GET NOTIFICATIONS

