module.exports = {
	env: {
		// 전역 변수 사용을 정의
		browser: true,
		es6: true,
		commonjs: true,
		node: true,
	},
	extends: [
		//추가한 플러그인에서 사용할 규칙을 설정
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	globals: {
		// 선언되지 않은 전역변수를 사용하는 경우(사용자 전역 변수 ex. window)
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"], //규칙 집합을 확장(플러그인만으로 규칙이 적용되진 않는다.)
	rules: {
		// 프로젝트에서 사용하는 규칙을 수정
		"quotes": ["error", "double", { allowTemplateLiterals: true }], //더블 쿼터 + 백틱 사용
		"@typescript-eslint/quotes": [
			"error",
			"double",
			{ allowTemplateLiterals: true },
		], //더블 쿼터 + 백틱 사용
		"no-unused-vars": "off", //사용안한 변수 경고 중복
		"spaced-comment": "off", //주석을 뒤에 쓰지 말라는 경고
		"@typescript-eslint/no-unused-vars": "warn", //사용안한 변수는 경고
		"jsx-a11y/control-has-associated-label": "off", // 상호작용하는 엘리먼트에 label을 넣는다
		"react/no-array-index-key": "off", // key값으로 index를 사용할수 있다.
		"comma-dangle": "off", // 마지막에 , 을 넣어주지 않는다.
		"arrow-body-style": "off", //화살표 함수 안에 return을 사용 할 수 있다.
		"react/no-unescaped-entities": "off", //문자열 내에서 " ' > } 허용
		"react/prop-types": "off", //proptypes를 사용하지 않는다.
		"object-curly-newline": "off", // { 다음 줄 바꿈을 강제로 사용하지 않는다.
		"react/jsx-one-expression-per-line": "off", //한라인에 여러개의 JSX를 사용 할 수 있다.
		"implicit-arrow-linebreak": "off", // 화살표 함수 다음에 줄 바꿈을 사용할 수 있다.
		"no-shadow": "off", //파일 내에서 중복 이름을 사용 할 수 있다.
		"operator-linebreak": "off", //연산자 다음 줄 바꿈을 사용 할 수 있다.
		"react/react-in-jsx-scope": "off", // jsx를 사용하여도 React를 꼭 import 하지 않아도 된다.
		"react/jsx-props-no-spreading": "off", //props를 스프래드 할 수 있다.
		"jsx-a11y/anchor-is-valid": "off", // next js에서는 a에 href없이 사용
		"global-require": "off", //함수 내에서 require 사용가능
		"no-use-before-define": "off", // 선언전에 사용하지 말라,
		"import/prefer-default-export": "off", //export default 권장
		"no-param-reassign": "off", //param assign 하지 않기
		"jsx-a11y/label-has-associated-control": "off", //label htmlFor을 사용하지 않아도 된다.
		"no-invalid-css": "off",
		"no-confusing-arrow": "off",
		"react/jsx-curly-newline": "off", //jsx안에 }를 새로운 라인에 사용할 수 있다.
		"indent": "off",
		"react/jsx-filename-extension": [
			2,
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] }, //jsx사용가능한 확장자 설정
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
	},
	settings: {
		//eslint 구성 파일에 설정 개체를 추가할 수 있으며, 실행될 모든 규칙에 제공
		"import/resolver": {
			typescript: "./tsconfig.json",
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
			},
		},
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx", ".js"],
		},
	},
	ignorePatterns: ["**/dist/*", "*.d.ts"],
};
