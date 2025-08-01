/**
 * 마크다운 텍스트에서 마크다운 문법을 제거하고 순수 텍스트만 반환합니다.
 * @param markdown 마크다운 텍스트
 * @returns 순수 텍스트
 */
export function stripMarkdown(markdown: string): string {
  if (!markdown) return ''
  
  return markdown
    // 헤딩 제거 (# ## ### 등)
    .replace(/^#{1,6}\s+/gm, '')
    // 굵은 글씨 제거 (**text** 또는 __text__)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    // 기울임 제거 (*text* 또는 _text_)
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // 인라인 코드 제거 (`code`)
    .replace(/`([^`]+)`/g, '$1')
    // 코드 블록 제거
    .replace(/```[\s\S]*?```/g, '')
    // 링크 제거 [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 이미지 제거 ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // 목록 마커 제거 (- * +)
    .replace(/^[\s]*[-*+]\s+/gm, '')
    // 순서 목록 마커 제거 (1. 2. 등)
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // 인용구 제거 (>)
    .replace(/^>\s+/gm, '')
    // 수평선 제거 (--- 또는 ***)
    .replace(/^[-*]{3,}$/gm, '')
    // 여러 줄바꿈을 하나로 통합
    .replace(/\n{3,}/g, '\n\n')
    // 앞뒤 공백 제거
    .trim()
}

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표를 추가합니다.
 * @param text 원본 텍스트
 * @param maxLength 최대 길이
 * @returns 잘린 텍스트
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (!text || text.length <= maxLength) return text
  
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * 마크다운 텍스트에서 미리보기용 순수 텍스트를 생성합니다.
 * @param markdown 마크다운 텍스트
 * @param maxLength 최대 길이
 * @returns 미리보기 텍스트
 */
export function getMarkdownPreview(markdown: string, maxLength: number = 150): string {
  const plainText = stripMarkdown(markdown)
  return truncateText(plainText, maxLength)
}