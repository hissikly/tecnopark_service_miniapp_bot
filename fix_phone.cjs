const fs = require('fs');
let content = fs.readFileSync('src/pages/PhoneCall.jsx', 'utf8');
content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\nimport { useStore } from '../store';");
content = content.replace('const [requested, setRequested] = useState(false);', 'const [requested, setRequested] = useState(false);\n  const { dispatch } = useStore();\n  const handleDone = () => {\n    dispatch({ type: "SUPPORT_ADD_HISTORY" });\n    navigate("/profile");\n  };');
content = content.replace("onClick={() => navigate('/profile')}", "onClick={handleDone}");
fs.writeFileSync('src/pages/PhoneCall.jsx', content);
