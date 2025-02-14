// آپلود فایل به سرور
document.getElementById("uploadForm-category1").addEventListener("submit", async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("http://localhost:5000/api/upload/category1", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    alert(data.message);
    loadQuestions();
});

// بارگذاری سوالات آپلود شده
async function loadQuestions() {
    const response = await fetch("http://localhost:5000/api/questions");
    const questions = await response.json();

    const list = document.getElementById("category1List");
    list.innerHTML = "";
    questions.forEach(q => {
        const li = document.createElement("li");

        // لینک دانلود
        const downloadLink = document.createElement("a");
        downloadLink.href = http: //localhost:5000/${q.path};
            downloadLink.target = "_blank";
        downloadLink.textContent = دانلود $ { q.filename };

        // دکمه حذف
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.addEventListener("click", () => deleteQuestion(q._id));

        li.appendChild(downloadLink);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

// حذف سوال
async function deleteQuestion(id) {
    const response = await fetch(http: //localhost:5000/api/questions/${id}, {
        method: "DELETE",
    });

const data = await response.json();
alert(data.message);
loadQuestions();
}

loadQuestions();