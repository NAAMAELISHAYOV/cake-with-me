function searchRecipes() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    let recipeCards = document.getElementsByClassName('recipe-card');
  
    let categoryCards = document.getElementsByClassName('card');


    let foundAny = false;
    let targetContainer = null;


    if (recipeCards.length > 0) {
        targetContainer = document.querySelector('.recipe-container');
        for (let i = 0; i < recipeCards.length; i++) {
            let title = recipeCards[i].querySelector('h3').innerText.toLowerCase();
            let description = recipeCards[i].querySelector('p').innerText.toLowerCase();
            if (title.includes(input) || description.includes(input)) {
                recipeCards[i].style.display = "flex";
                foundAny = true; 
            } else {
                recipeCards[i].style.display = "none";
            }
        }
    }

    
    if (categoryCards.length > 0) {
        targetContainer = categoryCards[0].parentElement;
        for (let j = 0; j < categoryCards.length; j++) {
            let catTitle = categoryCards[j].querySelector('h3').innerText.toLowerCase();
            let catDesc = categoryCards[j].querySelector('p').innerText.toLowerCase();
            if (catTitle.includes(input) || catDesc.includes(input)) {
                categoryCards[j].style.display = "block";
                foundAny = true; // מצאנו לפחות קטגוריה אחת
            } else {
                categoryCards[j].style.display = "none";
            }
        }
    }

    if (targetContainer) {
        // נבדוק אם כבר קיימת הודעת שגיאה קודמת כדי לא לשכפל אותה
        let existingMsg = document.getElementById('no-results-msg');
        
        if (!foundAny) {
          
            if (!existingMsg) {
                let noResultsDiv = document.createElement('div');
                noResultsDiv.id = 'no-results-msg';
                
                noResultsDiv.style.textAlign = 'center';
                noResultsDiv.style.width = '100%';
                noResultsDiv.style.padding = '40px 20px';
                noResultsDiv.style.color = '#d87093';
                noResultsDiv.style.fontSize = '1.3em';
                noResultsDiv.style.fontWeight = 'bold';
                noResultsDiv.style.background = 'white';
                noResultsDiv.style.borderRadius = '15px';
                noResultsDiv.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
                
                noResultsDiv.innerHTML = '🔍 אופס... לא מצאנו מתכון או קטגוריה שתואמים לחיפוש שלך. כדאי לנסות מילה אחרת!';
                
                targetContainer.appendChild(noResultsDiv);
            }
        } else {
        
            if (existingMsg) {
                existingMsg.remove();
            }
        }
    }
}


document.getElementById('searchInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

document.getElementById('searchInput')?.addEventListener('input', function () {
    searchRecipes();
});



const toggleBtn = document.getElementById('darkModeToggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.textContent = '☀️ מצב יום';
        } else {
            toggleBtn.textContent = '🌙 מצב לילה';
        }
    });
}


const randomBtn = document.getElementById('randomRecipeBtn');
if (randomBtn) {
    randomBtn.addEventListener('click', () => {
        const pages = ['cakes.html', 'cookies.html', 'desserts.html', 'pastries.html'];
        const randomIndex = Math.floor(Math.random() * pages.length);
        window.location.href = pages[randomIndex];
    });
}
// פיצ'ר תיבות סימון אינטראקטיביות למצרכים ושלבי הכנה
document.addEventListener("DOMContentLoaded", function () {
    // 1. טיפול ברשימת המצרכים (ul)
    const ingredientItems = document.querySelectorAll(".ingredients-box ul li");
    ingredientItems.forEach(item => {
        // יוצרים אלמנט של תיבת סימון מעוצבת
        let checkbox = document.createElement("span");
        checkbox.className = "custom-checkbox";
        
        // מציבים את התיבה בתחילת השורה
        item.insertBefore(checkbox, item.firstChild);
        
        // הופכים את כל השורה ללחיצה
        item.addEventListener("click", function () {
            this.classList.toggle("checked-item");
        });
    });

    // 2. טיפול בשלבי ההכנה (ol)
    const instructionItems = document.querySelectorAll(".instructions-box ol li");
    instructionItems.forEach(item => {
        // יוצרים אלמנט של תיבת סימון מעוצבת
        let checkbox = document.createElement("span");
        checkbox.className = "custom-checkbox";
        
        // מציבים את התיבה בתחילת השורה
        item.insertBefore(checkbox, item.firstChild);
        
        // הופכים את כל השורה ללחיצה
        item.addEventListener("click", function () {
            this.classList.toggle("checked-item");
        });
    });
});
// פיצ'ר אפקט כתיבה דינמי (Typing Effect) לדף הבית
document.addEventListener("DOMContentLoaded", function () {
    const typingElement = document.getElementById("typing-text");
    
    // אם האלמנט לא קיים בדף הנוכחי (למשל בדפי המתכונים), הקוד לא ירוץ ולא ייצר שגיאות
    if (!typingElement) return;

    // רשימת המילים שיתחלפו בלולאה - את יכולה להוסיף או לשנות כאן מילים!
    const words = ["מתוקים שיש.", "שוקולדיים.", "נימוחים.", "מגרים.", "מושלמים."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // מחיקת אות
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // כתיבת אות
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // מהירות הכתיבה והמחיקה
        let typeSpeed = isDeleting ? 50 : 100;

        // אם המילה נכתבה במלואה, נחכה קצת לפני שנתחיל למחוק
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // השהייה של שנייה וחצי כשהמילה מלאה
            isDeleting = true;
        } 
        // אם המילה נמחקה לחלוטין, נעבור למילה הבאה ברשימה
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // לולאה שחוזרת להתחלה בסיום
            typeSpeed = 500; // השהייה קלה לפני שמתחילים לכתוב את המילה הבאה
        }

        setTimeout(type, typeSpeed);
    }

    // הפעלת האפקט
    type();
});