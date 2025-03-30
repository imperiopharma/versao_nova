
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'database.php';

// Obter o endpoint requisitado
$request_uri = $_SERVER['REQUEST_URI'];
$endpoint = trim(parse_url($request_uri, PHP_URL_PATH), '/');
$endpoint = str_replace('api/', '', $endpoint);

// Obter o método HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Obter os dados enviados
$data = json_decode(file_get_contents('php://input'), true);

// Roteamento básico da API
switch ($endpoint) {
    case 'produtos':
        if ($method == 'GET') {
            // Listar produtos
            $stmt = $pdo->query("SELECT * FROM products WHERE status = 'active'");
            $products = $stmt->fetchAll();
            echo json_encode(['data' => $products]);
        }
        break;
        
    case 'categorias':
        if ($method == 'GET') {
            // Listar categorias
            $stmt = $pdo->query("SELECT * FROM categories WHERE active = 1");
            $categories = $stmt->fetchAll();
            echo json_encode(['data' => $categories]);
        }
        break;
        
    case 'marcas':
        if ($method == 'GET') {
            // Listar marcas
            $stmt = $pdo->query("SELECT * FROM brands WHERE status = 'active'");
            $brands = $stmt->fetchAll();
            echo json_encode(['data' => $brands]);
        }
        break;
        
    case 'combos':
        if ($method == 'GET') {
            // Listar combos
            $stmt = $pdo->query("SELECT * FROM products WHERE status = 'active' AND promo_price > 0");
            $combos = $stmt->fetchAll();
            echo json_encode(['data' => $combos]);
        }
        break;
        
    // Adicione mais endpoints conforme necessário
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint não encontrado']);
        break;
}
?>
