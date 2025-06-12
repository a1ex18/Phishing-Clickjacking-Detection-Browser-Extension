`** The project architecture includes:**`
 1. Background Script: Loads phishing patterns and queries Google Safe Browsing API.
 2. Content Script: Extracts links and detects clickjacking via iframe analysis.
 3. PopupInterface: Displays scan results to users.
 4. Features:
 a) Real-time phishing link detection using heuristic checks and Google Safe Browsing API.
 b) Clickjacking detection through iframe style analysis (opacity, z-index, etc.).
 c) User-friendly popup interface for scan initiation and result display.
 5. Languages and Technologies: JavaScript, HTML, CSS.
 6. Tools: Chrome Extension APIs, Visual Studio Code, Git/GitHub

`**Proposed Methodology**`
 1. Data Collection: Compiled phishing urls and links from public datasets.
 2. Phishing Detection: Combined heuristic analysis (keyword matching, suspicious TLDs) with
 Google Safe Browsing API checks.
 3. Clickjacking Detection: Analyzed iframe properties (opacity, z-index, transform) to identify
 hidden or suspicious frames.
 4. Extension Development: Built a Chrome extension with background, content, and popup
 scripts.
 5. Testing: Evaluated on test webpages with known phishing and clickjacking instances.
 6. Result Visualization: Displayed results in a popup with color-coded indicators.

 `**Algorithm/Description of the Work**`
 1. Phishing Detection:
   a) Heuristic Check: Matches URLs against a list of phishing keywords and suspicious TLDs(e.g., .tk, .ml).
   b) API Check: Queries Google Safe Browsing API for threat matches (MALWARE, SOCIALENGINEERING).
 2. Clickjacking Detection:
   a) Analyzes iframes for suspicious properties (opacity < 0.1, z-index > 1000, non-default transform, or pointer-events: none) as potential threats.
 3. Workflow:
   a) Content script extracts links and checks for clickjacking, sends data to background script for phishing validation, and popup displays results.
