document.addEventListener("DOMContentLoaded", function () {
  const teamContainer = document.querySelector(".team-container");
  const imagePath = "../image/";

  // 프로필
  const members = [
    {
      name: "김규철",
      github: `${imagePath}github-remove.png`,
      velog: `${imagePath}velog-remove.png`,
      githubLink: "https://github.com/chillax96/chillax96.github.io",
      velogLink: "https://velog.io/@chillax96/posts",
      backgroundImage: `${imagePath}q.jpg`,
      age: 29,
      mbti: "INFP",
      advantages: "끈기 있다.",
      style: "꼼꼼하다.",
      tmi: "더위를 많이 타서 여름이 힘들다...",
      imgSrc: `${imagePath}q.jpg`,
    },
    {
      name: "김동우",
      github: `${imagePath}github-remove.png`,
      velog: `${imagePath}tstory-remove.png`,
      githubLink: "https://github.com/noodlewd",
      velogLink: "https://rladnehd35.tistory.com/",
      backgroundImage: `${imagePath}w.jpg`,
      age: 27,
      mbti: "ESFJ",
      advantages: "흥미가 생기면 집요하게 파고드는 편입니다.",
      style:
        "협업을 중요 시 하고 혼자 성공했을 때 보다 같이 해냈을때 성취감이 더 큽니다.",
      tmi: "고양이를 좋아하는데 고양이를 키워본 적이 없습니다...",
      imgSrc: `${imagePath}w.jpg`,
    },
    {
      name: "강혜린",
      github: `${imagePath}github-remove.png`,
      velog: `${imagePath}tstory-remove.png`,
      githubLink: "https://github.com/hyerin-kang",
      velogLink: "https://rinny01.tistory.com/",
      tistroyLink: "https://rinny01.tistory.com",
      backgroundImage: `${imagePath}r.jpg`,
      age: 30,
      mbti: "ESTP",
      advantages:
        "레이아웃, 컬러부터 1px의 디테일까지 신경쓰며<br>화면을 구성하는데 진심을 다하는 편",
      style: "팀원으로서의 맡은 역할을 책임감 있게 잘 수행해요.",
      tmi: "급 여행가는게 취미라 지금 떠나고 싶다!",
      imgSrc: `${imagePath}r.jpg`,
    },
    {
      name: "조영현",
      github: `${imagePath}github-remove.png`,
      velog: `${imagePath}tstory-remove.png`,
      githubLink: "https://github.com/joyounghyun550/sparta",
      velogLink: "https://yyy3489.tistory.com/",
      backgroundImage: `${imagePath}e.jpg`,
      age: 30,
      mbti: "ISTP",
      advantages: "마음먹은건 어떻게 해서든 꼭 해내요!",
      style: "호기심이 많고 자유로움을 좋아합니다.",
      tmi: "감기에 걸려서 힘들어요 !!",
      imgSrc: `${imagePath}e.jpg`,
    },
  ];

  members.forEach((member, idx) => {
    const memberDiv = document.createElement("div");
    memberDiv.className = "member";

    memberDiv.innerHTML = `
            <div class="photo member_content" id="member_content_${idx}">
                <img src="${member.backgroundImage}" alt="${member.name}">
                <div class="overlay">${member.name}</div>
            </div>            
            <div class="icons">
            <span class='background_name'>${member.name}</span>
            <span class="mbti">${member.mbti}</span>
            <a href="${member.githubLink}" target="_blank"><img src="${
      member.github
    }" alt="GitHub"></a>
                <a href="${member.velogLink}" target="_blank"><img src="${
      member.velog
    }" alt="${member.name === "조영현" ? "Tstory" : "Velog"}"></a>
            </div>
        `;

    teamContainer.appendChild(memberDiv);

    // Add event listener for each member to show modal
    const memberContent = document.getElementById(`member_content_${idx}`);
    memberContent.addEventListener("click", () => {
      showModal(members[idx]);
    });
  });

  const closeBtn = document.getElementById("close-modal");
  const teamModal = document.getElementById("modal_container");

  function showModal(member) {
    teamModal.style.display = "none";
    teamModal.style.display = "flex"; // flex로 변경하여 중앙에 위치하도록 함

    // 멤버 사진
    const imgBox = document.getElementById("member_image");
    imgBox.innerHTML = `<img src="${member.imgSrc}" alt="${member.name}">`;

    // 멤버 이름, 나이
    const memberName = document.getElementById("member_name");
    const memberAge = document.getElementById("member_age");
    memberName.innerText = member.name;
    memberAge.innerText = member.age + "살";

    // 멤버 내용
    const memberInfo = document.getElementById("member_content");
    memberInfo.innerHTML = `
            <div class="content_inner">
                <img src="${imagePath}icon-agree.png" alt="협업" class="modal_icon">
                ${member.style}
            </div>
            <div class="content_inner">
                <img src="${imagePath}icon-positive.png" alt="장점" class="modal_icon">
                ${member.advantages}
            </div>
            <div class="content_inner">
                <img src="${imagePath}icon-tmi.png" alt="tmi" class="modal_icon">
                ${member.tmi}
            </div>
        `;
    disableScroll();
  }

  // 닫기 버튼 누르면 모달 사라짐
  closeBtn.addEventListener("click", () => {
    teamModal.style.display = "none";
    enableScroll();
  });

  // 모달 바깥화면 클릭 시 모달 사라짐
  window.addEventListener("click", (event) => {
    if (event.target === teamModal) {
      teamModal.style.display = "none";
      enableScroll();
    }
  });
});
