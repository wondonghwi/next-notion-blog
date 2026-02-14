module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 스타일 관련
        'refactor', // 리팩토링
        'chore', // 기타 작업
        '기능', // 새로운 기능
        '수정', // 버그 수정
        '문서', // 문서 수정
        '스타일', // 스타일 관련
        '리팩토링', // 리팩토링
        '기타', // 기타 작업
      ],
    ],
  },
};
