const fs = require('fs');
let content = fs.readFileSync('src/pages/PostGarantia.jsx', 'utf8');
content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\nimport { useStore } from '../store';");
content = content.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const { dispatch } = useStore();\n  const handleUpgrade = () => {\n    dispatch({ type: "UPGRADE_PLAN" });\n    navigate("/success");\n  };');
content = content.replace("onClick={() => navigate('/success')}", "onClick={handleUpgrade}");
fs.writeFileSync('src/pages/PostGarantia.jsx', content);
