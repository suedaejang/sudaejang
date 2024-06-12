<template>
  <div class="container">
    <h1>최근 거래 목록</h1>
    <div class="filter">
      <label>조회기간 설정</label>
      <div class="period-options">
        <button onclick="hideCustomInput()">오늘</button>
        <button onclick="hideCustomInput()">1개월</button>
        <button onclick="hideCustomInput()">3개월</button>
        <button onclick="hideCustomInput()">6개월</button>
        <button onclick="showCustomInput()">직접입력</button>
      </div>
      <div class="category-filter">
        <label for="category">카테고리</label>
        <select id="category">
          <option value="">카테고리</option>
          <option value="shopping">쇼핑</option>
          <option value="salary">급여</option>
          <option value="transfer">이체</option>
        </select>
      </div>
      <div class="custom-input" id="customInput" style="display: none">
        <label for="startDate">시작 날짜:</label>
        <input type="date" id="startDate" />
        <label for="endDate">종료 날짜:</label>
        <input type="date" id="endDate" />
        <button onclick="applyCustomInput()">적용</button>
      </div>
    </div>
  </div>
  <button class="edit-btn">✎</button>
</template>

<script>
function showCustomInput() {
  document.getElementById('customInput').style.display = 'block';
}

function hideCustomInput() {
  document.getElementById('customInput').style.display = 'none';
}

function applyCustomInput() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  alert(`Custom date range applied: ${startDate} to ${endDate}`);
  // 여기에 필요한 로직 추가
}
</script>
