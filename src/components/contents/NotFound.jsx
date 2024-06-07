export default function NotFound() {
  return (
    <div className='errorContainer'>
      <div className='errorContent'>
        <h1 className='errorCode'>Oops!</h1>
        <h2 className='errorMessage'>여기는 어떻게 오셨나요?</h2>
        <p>찾으시는 페이지가 사라졌거나, 아직 만들어지지 않았어요.</p>
        <p>걱정마세요, 우리 함께 집으로 돌아가요.</p>
        <a href='/' className='homeLink'>
          홈으로 가는 길
        </a>
      </div>
    </div>
  );
}
