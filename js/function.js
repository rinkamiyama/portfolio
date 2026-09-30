document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".typing");

    let lineIndex = 0;
    let charIndex = 0;

    texts.forEach(text => {
        text.dataset.text = text.textContent;
        text.textContent = "";
    });

    function typeText() {
        if (lineIndex >= texts.length) {
            return;
        }

        const currentText = texts[lineIndex];
        const originalText = currentText.dataset.text;

        currentText.classList.add("typing-active");

        if (charIndex < originalText.length) {
            currentText.textContent += originalText.charAt(charIndex);
            charIndex++;

            setTimeout(typeText, 50);
        } else {
            currentText.classList.remove("typing-active");

            lineIndex++;
            charIndex = 0;

            setTimeout(typeText, 200);
        }
    }

    typeText();


    // Works Filter
    const filters = document.querySelectorAll(".filter");
    const works = document.querySelectorAll(".works-items > a");


    // Smartphone Works Drawer
    const drawerToggle = document.querySelector(".works-drawer-toggle");
    const drawerMenu = document.querySelector(".works-drawer-menu");
    const drawerArrow = document.querySelector(".drawer-arrow");
    const drawerTitle = document.querySelector(".drawer-title");


    filters.forEach(filter => {
        filter.addEventListener("click", function(event) {
            event.preventDefault();

            const selectedCategory = this.dataset.filter;

            works.forEach(work => {
                if (!selectedCategory || work.classList.contains(selectedCategory)) {
                    work.style.display = "";
                } else {
                    work.style.display = "none";
                }
            });

            filters.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");


            // スマホのドロワー内で選択したカテゴリーを表示
            if (this.closest(".works-drawer-menu") && drawerTitle) {
                drawerTitle.textContent = this.textContent;
            }


            // スマホではカテゴリーを選んだらドロワーを閉じる
            if (window.innerWidth <= 767 && drawerMenu) {
                drawerMenu.classList.remove("open");

                if (drawerArrow) {
                    drawerArrow.classList.remove("open");
                }
            }
        });
    });


    // ドロワーを開閉
    if (drawerToggle && drawerMenu) {
        drawerToggle.addEventListener("click", () => {

            const isOpen = drawerMenu.classList.contains("open");

            if (isOpen) {
                drawerMenu.classList.remove("open");

                if (drawerArrow) {
                    drawerArrow.classList.remove("open");
                }

            } else {
                drawerMenu.classList.add("open");

                if (drawerArrow) {
                    drawerArrow.classList.add("open");
                }
            }
        });
    }

});
