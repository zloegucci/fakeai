import { useSelector, useDispatch } from 'react-redux'
import styles from '@/styles/Home.module.css'
import { setOption, setText } from '@/src/store/appSlice'

export default function Home() {
  const dispatch = useDispatch()
  const text = useSelector((state) => state.app.text)
  const selectedOption = useSelector((state) => state.app.selectedOption)

  const handleTextChange = (e) => {
    dispatch(setText(e.target.value))
  }

  const handleOptionChange = (e) => {
    dispatch(setOption(e.target.value))
  }

  const generateRandomPNG = (fileName) => {
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')

    // Fill the background with a random color
    ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw some random shapes
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
      ctx.beginPath()
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 50,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }

    const pngData = canvas.toDataURL('image/png')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngData
    downloadLink.download = `${fileName}.png`
    downloadLink.click()
    downloadLink.remove()
  }

  const handleButtonClick = (type) => {
    generateRandomPNG(`random_image_${type}`)
  }

  return (
    <div className={styles.container}>
      <h1>Demo</h1>

      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter some text"
        className={styles.input}
      />

      <div>
        <label className={styles.label}>
          <input
            type="radio"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={handleOptionChange}
          />
          Option 1
        </label>
        <label className={styles.label}>
          <input
            type="radio"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={handleOptionChange}
          />
          Option 2
        </label>
        <label className={styles.label}>
          <input
            type="radio"
            value="option3"
            checked={selectedOption === 'option3'}
            onChange={handleOptionChange}
          />
          Option 3
        </label>
      </div>

      <button
        onClick={() => handleButtonClick('One')}
        className={styles.button}
      >
        Generate PNG 1
      </button>
      <button
        onClick={() => handleButtonClick('Two')}
        className={styles.button}
      >
        Generate PNG 2
      </button>
    </div>
  )
}
