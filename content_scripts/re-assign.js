(function() {

    const _window = window;
    if (_window.hasRunReAssignNptel) {
        return;
    }
    _window.hasRunReAssignNptel = true;

    /*
    * Clears answer and add as show answer button for each quesion.
    */
    function hideAnswers() {
        // clear and enable input
        Array.prototype.forEach.call(document.querySelectorAll(".qt-choices .gcb-mcq-choice input"), function (radio) {
            radio.disabled = false; radio.checked = false;
        });
        // clear answers
        Array.prototype.forEach.call(document.querySelectorAll(".qt-feedback"),  (elem) => {
            elem.style.display = "none";
            
            // create button for first button for one time and reuse it 
            if (_window.hasRunHideAnswersReAssignNptel) {
                Array.prototype.forEach.call(document.querySelectorAll(".re_assign_nptel_show_answer_button"), function (elem) {
                    elem.style.display = "";
                }); 
            } else {
                // show answer button which displays answer onclick
                const showAnswerButton = document.createElement("button");
                showAnswerButton.classList.add("gcb-button", "re_assign_nptel_show_answer_button");
                showAnswerButton.textContent = "SHOW ANSWER";
                showAnswerButton.onclick = function() {
                    elem.style.display = "";
                }
                
                elem.parentNode.insertBefore(showAnswerButton, elem);
            }
        });
        _window.hasRunHideAnswersReAssignNptel = true
    }

    // Unhides the answers for all questions
    function showAnswers() {
        Array.prototype.forEach.call(document.querySelectorAll(".qt-feedback"), function (elem) {
            elem.style.display = "";
        }); 
        Array.prototype.forEach.call(document.querySelectorAll(".re_assign_nptel_show_answer_button"), function (elem) {
            elem.style.display = "none";
        }); 
    }

    // adding Listeners to hide and show answers
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "re_assign_nptel_hideAnswers") {
            hideAnswers();
        } else if (message.command === "re_assign_nptel_showAnswers") {
            showAnswers();
        }
    });
})();