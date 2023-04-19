# API

## GET /cats/random50
- ### Request parameter
  None
- ### Query paramter
  None
- ### Response
  Success 200

  |Field name|Type|Description|
  |-|-|-|
  |data|Array|랜덤한 50개의 고양이 사진 목록입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    "data": [{
      id: string
      url: string
      name: string
    }]
  }
  ```

## 2. GET /cats/search
- ### Request parameter
  None
- ### Query paramter
  |Field name|Type|Description|
  |-|-|-|
  |q|string|고양이의 품종(영어/한글).|
  |page|number|페이지|
  |limit|number|최대 아이템 갯수|

- ### Response
  Success 200

  |Field name|Type|Description|
  |-|-|-|
  |data|Array|Keyword로 검색된 고양이 사진 목록입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    "data": [{
      id: string
      url: string
      name: string
    }]
  }
  ```

## 3. GET /cats/:id
- ### Request parameter
  |Field name|Type|Description|
  |-|-|-|
  |id|string|고양이 사진의 id값 입니다.|
- ### Query paramter
  None

- ### Response
  Success 200

  |Field name|Type|Description|
  |-|-|-|
  |data|Object|Id로 검색된 고양이 사진 입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    "data": {
      name: string
      id: string
      url: string
      width: number
      height: number
      temperament: string
      origin: string
    }
  }
  ```
