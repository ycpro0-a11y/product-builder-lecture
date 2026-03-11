/**
 * Real Estate Exam Guide - Main JavaScript
 * 2026 공인중개사 시험 D-Day 및 계산기 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. D-Day 카운터 로직
    const dDayDisplay = document.getElementById('d-day');
    if (dDayDisplay) {
        const examDate = new Date('2026-10-31T09:00:00'); // 2026년 시험 예상일
        
        function updateDDay() {
            const now = new Date();
            const diff = examDate - now;
            
            if (diff <= 0) {
                dDayDisplay.textContent = '제37회 시험일입니다! 합격을 기원합니다.';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            dDayDisplay.textContent = `제37회 시험까지 D-${days}일 ${hours}시간 ${minutes}분`;
        }
        
        updateDDay();
        setInterval(updateDDay, 60000); // 1분마다 업데이트
    }

    // 2. 합격 예측 계산기 로직 (calculator.html 전용)
    const calcBtn = document.getElementById('run-calc');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            // 과목별 점수 가져오기
            const m1 = parseInt(document.getElementById('m1').value) || 0; // 부동산학개론
            const m2 = parseInt(document.getElementById('m2').value) || 0; // 민법
            const s1 = parseInt(document.getElementById('s1').value) || 0; // 중개사법
            const s2 = parseInt(document.getElementById('s2').value) || 0; // 공법
            const s3 = parseInt(document.getElementById('s3').value) || 0; // 공시/세법
            
            const avg1 = (m1 + m2) / 2;
            const avg2 = (s1 + s2 + s3) / 3;
            
            const resultsDiv = document.getElementById('calc-results');
            resultsDiv.style.display = 'block';
            
            let html = '';
            
            // 1차 판정
            html += `<div style="margin-bottom: 20px; padding: 15px; border-radius: 8px; background: #f8fafc; border-left: 5px solid ${avg1 >= 60 && m1 >= 40 && m2 >= 40 ? '#38a169' : '#e53e3e'}">`;
            html += `<h3>[1차 시험 결과]</h3>`;
            html += `<p>평균 점수: <strong>${avg1.toFixed(1)}점</strong></p>`;
            if (m1 < 40 || m2 < 40) html += `<p style="color: #e53e3e;">⚠️ 과락 발생 (40점 미만 과목 있음)</p>`;
            html += `<p>판정: <strong>${(avg1 >= 60 && m1 >= 40 && m2 >= 40) ? '합격 권권' : '불합격 (기준 미달)'}</strong></p>`;
            html += `</div>`;
            
            // 2차 판정
            html += `<div style="padding: 15px; border-radius: 8px; background: #f8fafc; border-left: 5px solid ${avg2 >= 60 && s1 >= 40 && s2 >= 40 && s3 >= 40 ? '#38a169' : '#e53e3e'}">`;
            html += `<h3>[2차 시험 결과]</h3>`;
            html += `<p>평균 점수: <strong>${avg2.toFixed(1)}점</strong></p>`;
            if (s1 < 40 || s2 < 40 || s3 < 40) html += `<p style="color: #e53e3e;">⚠️ 과락 발생 (40점 미만 과목 있음)</p>`;
            html += `<p>판정: <strong>${(avg2 >= 60 && s1 >= 40 && s2 >= 40 && s3 >= 40) ? '합격 권권' : '불합격 (기준 미달)'}</strong></p>`;
            html += `</div>`;
            
            resultsDiv.innerHTML = html;
        });
    }
});
