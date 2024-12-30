//방명록 작성 폼 보이게 하기기
document.getElementById("openWrite").addEventListener("click", function () {
  document.getElementById("sendMsg").classList.toggle("disBlock");
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3O1Ge73lYDpFLgHiyvu7j6opvOYHZgBU",
  authDomain: "weare2-99bb5.firebaseapp.com",
  projectId: "weare2-99bb5",
  storageBucket: "weare2-99bb5.firebasestorage.app",
  messagingSenderId: "325409435675",
  appId: "1:325409435675:web:f7309d3f8163e6b02548be",
  measurementId: "G-D5WVPX205K",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 초기화
//로드시 데이터 가져오기
async function fetchData() {
  const querySnapshot = await getDocs(collection(db, "visitors"));
  querySnapshot.forEach((doc) => {
    const visitor = doc.data();
    createLi(visitor, doc.id);
  });
}
fetchData(); // 데이터 가져오기 실행
//추가 li태그 공통
function createLi(visitor, docId) {
  const commentList = document.getElementById("commentList");
  let li = document.createElement("li");
  li.innerHTML = `
      <p class="name">${visitor.name}</p>
      <p class="memo">${visitor.message}</p>
      <button class="deleteBtn" data-doc-id="${docId}">삭제</button>`;
  commentList.appendChild(li);
  const deleteBtn = li.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", function () {
    const docId = deleteBtn.dataset.docId;
    console.log(docId);
    if (docId) {
      deleteVisitor(docId); // 문서 삭제 함수 호출
    } else {
      console.error("docId가 없습니다!");
    }
  });
}
//방명록 작성
document.getElementById("sendMsg").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = e.target.name.value;
  const password = e.target.pw.value;
  const message = e.target.message.value;
  const doc = {
    name: name,
    pw: password,
    message: message,
  };
  //유효성 검사
  if (!name || !message || !password) {
    if (!name) alert("작성자를 입력하세요.");
    if (!message) alert("내용을 입력하세요.");
    if (!password) alert("비밀번호를 입력하세요.");
    return;
  }
  const docRef = await addDoc(collection(db, "visitors"), doc);
  alert("작성완료!");
  //컴포넌트 생성
  let li = document.createElement("li");
  li.innerHTML = `
      <p class="name">${name}</p>
      <p class="memo">${message}</p>
      <button class="deleteBtn" data-doc-id="${docRef.id}">삭제</button>`;
  document.getElementById("commentList").prepend(li);
  const deleteBtn = li.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", function () {
    deleteVisitor(docRef.id); // 문서 삭제 함수 호출
  });
  // 값 비워주기
  e.target.name.value = "";
  e.target.pw.value = "";
  e.target.message.value = "";
});
//삭제함수
async function deleteVisitor(docId) {
  //비밀번호 입력 받기
  const passwordInput = prompt("비밀번호를 입력하세요");
  if (!passwordInput) {
    alert("비밀번호를 입력하세요");
    return;
  }
  const visitorRef = doc(db, "visitors", docId); // 방문자ID가져오기
  const visitor = await getDoc(visitorRef); // 방문자 정보 가져오기
  if (visitor.data().pw !== passwordInput) {
    alert("비밀밀번호가 일치하지 않습니다.");
    return;
  }
  await deleteDoc(visitorRef); // 문서 삭제
  console.log("문서 삭제 완료");
  alert("삭제가 완료되었습니다!");
  const liToDelete = document.querySelector(`button[data-doc-id='${docId}']`).parentNode;
  liToDelete.remove();
  console.log("test");
}
