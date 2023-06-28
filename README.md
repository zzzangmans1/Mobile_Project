# Mobile_Project
핸드폰 주문 어플

구조
- src
  - screens
    - HomeScreen.js
    - LoginScreen.js
    - ProductListScreen.js
    - ProductDetailScreen.js
    - CartScreen.js
    - OrderScreen.js
  - components
    - Header.js
    - Button.js
    - ProductItem.js
    - CartItem.js
  - navigation
    - AppNavigator.js
    - AuthNavigator.js
    - MainNavigator.js
  - utils
    - api.js
    - auth.js
  - data
    - products.js
  - assets
    - images
  - App.js

screens: 앱의 각 화면을 담당하는 컴포넌트들이 위치합니다. 각 화면에 해당하는 파일들을 생성합니다.
components: 재사용 가능한 작은 컴포넌트들이 위치합니다. 다양한 화면에서 사용되는 버튼, 헤더, 제품 아이템, 카트 아이템 등이 여기에 속합니다.
navigation: 네비게이션 관련 파일들이 위치합니다. 앱 내에서 화면 전환을 관리하는 네비게이션 스택, 탭, 드로어 네비게이션 등의 설정과 관련된 파일들이 여기에 포함됩니다.
utils: 앱에서 사용되는 유틸리티 함수들이 위치합니다. API 호출, 인증 관련 로직 등을 처리하는 함수들이 여기에 포함됩니다.
data: 앱에서 사용되는 가상의 데이터를 담은 파일들이 위치합니다. 제품 정보, 주문 내역 등의 데이터를 포함합니다.
assets: 앱에서 사용되는 이미지, 아이콘 등의 에셋 파일들이 위치합니다.
App.js: 앱의 진입점이 되는 파일입니다. 네비게이션 컨테이너를 설정하고 화면 구성에 필요한 파일들을 불러옵니다.
