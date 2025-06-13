# Phishing and Clickjacking Detector Extension

This Chrome extension scans the currently active webpage to detect phishing links and potential clickjacking threats. It combines heuristic checks, the Google Safe Browsing API, and iframe style analysis to assess the safety of webpage content.

Project Architecture

- Background Script 
  Loads phishing patterns from static files and communicates with the Google Safe Browsing API to validate URLs.

- Content Script 
  Extracts all hyperlinks and detects clickjacking attempts by analyzing the styling of iframe elements.

- Popup Interface  
  Allows users to initiate scans and view the results in a structured, color-coded format.

Features

- Real-time Phishing Link Detection 
  Uses a combination of static heuristics (such as suspicious TLDs and keyword matching) and the Google Safe Browsing API for identifying malicious URLs.

- Clickjacking Detection  
  Analyzes iframe attributes (e.g., opacity, z-index, transform, pointer-events) to detect attempts to overlay or hide malicious elements.

- Interactive User Interface 
  Provides a user-friendly popup interface for triggering scans and viewing results.

Technologies Used

- Languages: JavaScript, HTML, CSS  
- Tools: Chrome Extension APIs, Visual Studio Code, Git/GitHub

Proposed Methodology

1. Data Collection  
   - Compiled phishing-related keywords and domain patterns from publicly available datasets.

2. Phishing Detection  
   - Heuristic Analysis: Checks if URLs contain known phishing-related keywords or belong to domains with suspicious TLDs (e.g., `.tk`, `.ml`).
   - Google Safe Browsing API: Sends URLs to the API to identify matches with known malicious sites.

3. Clickjacking Detection 
   - Evaluates iframe elements on the page for styling properties indicative of clickjacking (e.g., low opacity, high z-index, pointer-event manipulation).

4. Extension Development 
   - Developed modular Chrome extension components including background script, content script, popup interface, and manifest configuration.

5. Testing
   - Evaluated performance and accuracy on test webpages containing known phishing and clickjacking content.

6. Result Visualization 
   - Displayed results in a structured popup view with color coding (e.g., red for phishing, green for safe).

 Detection Logic Overview

  Phishing Detection

- Heuristic Check: 
  Compares extracted URLs with:
  - Keyword lists (`phishing_keywords.lst`, `brand_names.lst`, etc.)
  - Domain patterns with high phishing correlation (e.g., `.tk`, `.ml`, `.cf`)

- Safe Browsing API:  
  Submits each URL to the Google Safe Browsing API to check for threats like `MALWARE` or `SOCIAL_ENGINEERING`.

Clickjacking Detection

Analyzes iframe properties including:
- `opacity < 0.1`
- `z-index > 1000`
- `pointer-events: none`
- Non-default `transform`

These are common indicators of hidden or deceptive frames used in clickjacking.

Workflow

1. User clicks "Scan" from the popup.
2. The content script extracts links and iframe details from the current page.
3. Clickjacking analysis is performed immediately.
4. Extracted links are passed to the background script for phishing validation.
5. Results are returned to the popup and displayed with visual indicators.

   Extra: For All phisihing links refer<https://github.com/Phishing-Database>

1. Clone or download this repository:
   git clone https://github.com/a1ex18/Phishing-Clickjacking-Detection-Browser-Extension.git
   
