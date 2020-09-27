const classNumberForm = document.getElementById('classNumberForm');
classNumberForm.focus();
const errorMessageBox = document.getElementById('errorMessageBox');
const errorMessageHeading = document.getElementById('errorMessageHeading');
const errorMessageText = document.getElementById('errorMessageText');
resetErrorMessage();

const openSyllabusBtn = document.getElementById('openSyllabusBtn');
openSyllabusBtn.addEventListener('click', () => {
  const classNumber = classNumberForm.value;
  if (classNumber.length < 6 || isNaN(classNumber)) {
    showErrorMessage('ValueError', 'Class number');
  } else if (!detectShozoku(classNumber)) {
    showErrorMessage('ValueError', 'Shozoku');
  } else {
    const url = createSyllabusURL(classNumber);
    console.log(url);
    window.open(url);
    classNumberForm.value = '';
  }
  classNumberForm.focus();
});

const languageLiList = [
  document.getElementById('japanese'),
  document.getElementById('english'),
];
if (location.hash.substring(1) === 'english') {
  languageLiList[1].classList.add('active');
  languageLiList[0].classList.remove('active');
}
for (let i = 0; i < 2; i++) {
  languageLiList[i].addEventListener('click', () => {
    languageLiList[i].classList.add('active');
    languageLiList[1 - i].classList.remove('active');
  });
}

/**
 * Detect inputed class number has correct shozoku number
 * @param {Number} classNumber
 * @return {Boolean}
 */
function detectShozoku(classNumber) {
  // TO-DO: Change to RegExp
  const shozoku = classNumber.substr(0, 2);
  const shozokuList = [91, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
    11, 12, 13, 22, 32, 71, 33, 72, 41, 43,
    51, 52, 48, 77, 47, 75, 49, 78, 46, 73, 70, 69, 99];
  for (let i = 0; i < shozokuList.length; i++) {
    if (shozoku == shozokuList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * Show error message TO-DO: エラーメッセージを詳細に説明する
 * @param {String} errorHeading
 * @param {String} errorText
 */
function showErrorMessage(errorHeading, errorText) {
  errorMessageHeading.textContent = errorHeading;
  errorMessageText.textContent = errorText;
  errorMessageBox.classList.add('alert-danger');
}

/**
 * Reset error message
 */
function resetErrorMessage() {
  errorMessageHeading.textContent = '';
  errorMessageText.textContent = '';
  errorMessageBox.classList.remove('alert-danger');
}

/**
 * Create Syllabus URL
 * @param {Number} classNumber
 * @param {String} languageMode 'english': English, others: Japanese
 * @return {String} syllabus URL
 */
function createSyllabusURL(classNumber) {
  const date = new Date();
  let year = date.getFullYear();
  if (date.getMonth() < 1) {
    year -= 1;
  }

  let languageNumber = 1;
  if (location.hash.substring(1) === 'english') {
    languageNumber = 2;
  }

  // https://kyomu.adm.okayama-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?lct_year=2020&lct_cd=2020090325&je_cd=2
  const url = `https://kyomu.adm.okayama-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx` +
    `?lct_year=${year}&lct_cd=${year}${classNumber}&je_cd=${languageNumber}`;
  return url;
}
