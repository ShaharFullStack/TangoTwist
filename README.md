# TangoTwist - Sun and Moon Puzzle Game

![TangoTwist Banner](https://api.placeholder.com/400/320)

TangoTwist is an elegant browser-based logic puzzle game featuring suns and moons in a cosmic dance. Balance light and dark as you solve challenging puzzles using logical deduction.

## 🌟 Demo

Play the game at: [GitHub Pages Demo](https://shaharfullstack.github.io/TangoTwist)

## ✨ Features

- **Beautiful Interface**: Modern UI with smooth animations and clean design
- **Adaptive Difficulty**: Multiple puzzles with varying complexity
- **Dark/Light Mode**: Toggle between visual themes based on your preference
- **Hint System**: Get help when you're stuck without spoiling the entire puzzle
- **Game Statistics**: Track your progress with move counters and timers
- **Interactive Constraints**: Real-time feedback on rule satisfaction
- **Mobile-Friendly**: Responsive design that works on all devices
- **Celebratory Feedback**: Enjoy victory animations when you solve a puzzle

## 📋 Game Rules

1. Fill the grid with suns (☀️) and moons (🌙)
2. Each row and column must contain exactly N/2 suns and N/2 moons
3. No more than two identical symbols can appear consecutively in a row or column
4. Satisfy all constraints between adjacent cells:
   - `=` means the symbols must be the same
   - `×` means the symbols must be different

## 🚀 Getting Started

### Play Online

Simply visit [https://shaharfullstack.github.io/TangoTwist](https://shaharfullstack.github.io/TangoTwist) to play in your browser.

### Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/ShaharFullStack/TangoTwist.git
   ```

2. Navigate to the project directory:
   ```
   cd TangoTwist
   ```

3. Open `index.html` in your preferred browser.

No build process or dependencies required! The game runs entirely in the browser with vanilla JavaScript.

## 🛠️ Technical Implementation

TangoTwist is built with:

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables, flexible layouts, and animations
- **JavaScript**: Vanilla JS for game logic and user interaction
- **Font Awesome**: Icon library for UI elements

The puzzle uses a grid-based system with a data-driven architecture to represent:
- Cell states (sun, moon, empty)
- Constraints between cells
- Game state management
- Move tracking and validation

## 🧩 Puzzle Generation

Puzzles follow these rules to ensure they're solvable:
- Each puzzle has a unique solution
- Starting points are strategically placed to guide solving
- Constraints create logical deduction paths
- Difficulty is balanced through the number of revealed cells and constraints

## 🙋‍♀️ Contributing

Contributions are welcome! Here's how you can help:

1. **Create New Puzzles**: Design new puzzle layouts and add them to the game
2. **Improve UI/UX**: Suggest or implement interface improvements
3. **Fix Bugs**: Help identify and resolve issues
4. **Add Features**: Implement new game mechanics or tools

Please open an issue to discuss major changes before submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Plans

- Puzzle generation algorithm
- Difficulty settings
- Save game progress
- Additional puzzle sizes (4×4, 8×8)
- Achievement system
- Custom themes
- Puzzle editor

## 📬 Contact

- GitHub: [@ShaharFullStack](https://github.com/ShaharFullStack)

---

Enjoy the cosmic dance of TangoTwist! ☀️ 🌙
