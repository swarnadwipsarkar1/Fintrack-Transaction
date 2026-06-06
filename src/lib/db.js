import { db } from './firebase.js';
import { doc, getDocs, setDoc, collection, deleteDoc } from 'firebase/firestore';

export async function fetchTransactions(uid) {
  if (!uid) return [];
  try {
    const txRef = collection(db, `users/${uid}/transactions`);
    const txSnap = await getDocs(txRef);
    const transactions = [];
    txSnap.forEach(doc => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (e) {
    console.error("Error fetching transactions:", e);
    return [];
  }
}

export async function addTransaction(uid, transaction) {
  if (!uid) return null;
  try {
    const txRef = doc(collection(db, `users/${uid}/transactions`));
    const newTx = { ...transaction, id: txRef.id };
    await setDoc(txRef, newTx);
    return newTx;
  } catch (e) {
    console.error("Error adding transaction:", e);
    return null;
  }
}

export async function deleteTransaction(uid, id) {
  if (!uid || !id) return false;
  try {
    await deleteDoc(doc(db, `users/${uid}/transactions`, id));
    return true;
  } catch (e) {
    console.error("Error deleting transaction:", e);
    return false;
  }
}
