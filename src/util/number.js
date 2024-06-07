export function formatNumber(number) {
   // return new Intl.NumberFormat('ko-KR').format(number);
   // 1만 이하의 숫자는 그대로 반환
   if (number < 10000) {
      return `${number}`;
   }

   // 1만 이상의 숫자를 "만" 단위로 변환
   const dividedNumber = number / 10000;
   // 소수점 둘째자리에서 반올림 (소수 첫째자리까지 유지)
   const roundedNumber = Math.round(dividedNumber * 10) / 10;

   return roundedNumber;
}
