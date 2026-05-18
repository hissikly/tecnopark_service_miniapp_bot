const fs = require('fs');
let content = fs.readFileSync('src/pages/Chat.jsx', 'utf8');
content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\nimport { useStore } from '../store';");
content = content.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const { dispatch } = useStore();\n  const handleEnd = () => {\n    dispatch({ type: "SUPPORT_ADD_HISTORY" });\n    navigate(-1);\n  };');
content = content.replace("onClick={() => navigate(-1)}", "onClick={handleEnd}");
fs.writeFileSync('src/pages/Chat.jsx', content);

let contentVideo = fs.readFileSync('src/pages/VideoCall.jsx', 'utf8');
contentVideo = contentVideo.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\nimport { useStore } from '../store';");
contentVideo = contentVideo.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const { dispatch } = useStore();\n  const handleEnd = () => {\n    dispatch({ type: "SUPPORT_ADD_HISTORY" });\n    navigate(-1);\n  };');
contentVideo = contentVideo.replace("onClick={() => navigate(-1)}", "onClick={handleEnd}");
fs.writeFileSync('src/pages/VideoCall.jsx', contentVideo);
