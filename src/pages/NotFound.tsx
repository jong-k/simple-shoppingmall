import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <h2>페이지를 찾을 수 없습니다</h2>
      <Link to="/">메인 페이지로</Link>
    </div>
  );
}
