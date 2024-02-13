function createUser(userName, password) {
  const response = fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'post',
    body: JSON.stringify({
      userName,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  return response
}
function generateToken(userName, password) {
  const res = fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method: 'post',
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res
}
describe('API-тесты на сервис bookstore', () => {
  test('1. Создание пользователя c ошибкой, логин уже используется', async () => {
    const response = await createUser('string', 'strinG123#')
    expect(response.status).toBe(406)
    const data = await response.json()
    expect(data.code).toBe('1204')
    expect(data.message).toBe('User exists!')
  })
  test('2. Создание пользователя c ошибкой, пароль не подходит', async () => {
    const response = await createUser('Maqwcxsda', 'String09022024')
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.code).toBe('1300')
    expect(data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    )
  })
  test('3. Создание пользователя успешно', async () => {
    const response = await createUser('DonnaNoble', 'stringQA20240212#!W')
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.username).toBe('DonnaNoble')
  })
  test('4. Генерация токена c ошибкой', async () => {
    const res = await generateToken()
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.code).toBe('1200')
    expect(data.message).toBe('UserName and Password required.')
  })
  test('5. Генерация токена успешно', async () => {
    const res = await generateToken('JohnSmith', 'Qwerty1!')
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe('Success')
    expect(data.result).toBe('User authorized successfully.')
  })
})
