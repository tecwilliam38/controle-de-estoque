import firestoreDb from "../components/firebaseConfig/index";
import { 
    collection,
    getDocs,
    getDoc,
    addDoc,
    upDate,
    deleteDoc,
    doc, 
    updateDoc
} from "firebase/firestore";

const db = firestoreDb;
const pccollectionRef = collection(db, 'teste');

class pcDataService{
    addPcs = (newPc) =>{
        return addDoc(pccollectionRef, newPc)
    };
    updatePc = (id, updatePc)=>{
        const pcDoc = doc(db, 'teste', id);
        return updateDoc(pcDoc, updatePc);
    };
    deletePC = (id)=>{
        const pcDoc = doc(db, 'teste', id);
        return deleteDoc(pcDoc);
    };
    getAllPcs = () =>{
        return getDocs(pccollectionRef);
    };
    getPc = (id) =>{
        const pcDoc = doc(db,'teste', id);
        return getDocs(pcDoc); 
    }
}
export default pcDataService();
