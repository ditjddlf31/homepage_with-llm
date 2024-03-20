const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path'); // 경로 모듈 불러오기
//http://localhost:3000
// 음식 데이터베이스 (임시 데이터)
const recipes = [
    { 
        name: '스파게티', 
        ingredients: ['파스타', '토마토 소스', '치즈'],  
        image: '../spaghetti.jpg' // 이미지 URL 추가
    },
    { 
        name: '샐러드', 
        ingredients: ['양상추', '토마토', '오이', '드레싱'],
        image: '../salad.jpg' // 이미지 URL 추가
    },
    { 
        name: '스테이크', 
        ingredients: ['소고기', '소금', '후추'],
        image: '../stack.jpg' // 이미지 URL 추가
    },
    { 
        name: '피자', 
        ingredients: ['밀가루', '토마토 소스', '치즈', '피자 토핑'],
        image: '../pizza.jpg' // 이미지 URL 추가
    },
    { 
        name: '햄버거', 
        ingredients: ['패티', '번', '야채', '소스'],
        image: '../hamburger.jpg' // 이미지 URL 추가
    },
    { 
        name: '라면', 
        ingredients: ['라면', '물', '스프', '계란'],
        image: '../ramen.jpg' // 이미지 URL 추가
    },
    { 
        name: '간장계란밥', 
        ingredients: ['계란', '소금', '식용유','쌀','간장','참기름'],
        image: '../soysauce_egg_rice.jpg' // 이미지 URL 추가
    },
    { 
        name: '김치찌개', 
        ingredients: ['김치', '두부', '양파','대파','돼지고기'],
        image: '../kimchi_soup.jpg' // 이미지 URL 추가
    },
    { 
        name: '감자튀김', 
        ingredients: ['감자', '소금', '식용유'],
        image: '../french_fries.jpg' // 이미지 URL 추가
    },
    { 
        name: '초밥', 
        ingredients: ['쌀', '생선', '야채', '식초', '와사비'],
        image: '../sushi.jpg' // 이미지 URL 추가
    },
    { 
        name: '김밥', 
        ingredients: ['밥', '김', '단무지', '계란', '맛살'],
        image: '../gimbap.jpg' // 이미지 URL 추가
    },
    { 
        name: '케이크', 
        ingredients: ['밀가루', '설탕', '버터', '계란', '바닐라 의존'],
        image: '../cake.jpg' // 이미지 URL 추가
    }
    // 추가 음식을 이어서 넣어주세요
];

// 홈페이지 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

// 음식 추천 라우트
app.get('/recommend', (req, res) => {
    const ingredients = req.query.ingredients.split(',');
    const recommendedRecipes = findRecipesWithIngredients(ingredients);
    res.json(recommendedRecipes);
});

// 음식재료를 포함하는 요리 찾기
function findRecipesWithIngredients(ingredients) {
    const matchingRecipes = recipes.filter(recipe => {
        return ingredients.every(ingredient => recipe.ingredients.includes(ingredient));
    });
    return matchingRecipes;
}

app.use(express.static(__dirname));

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});