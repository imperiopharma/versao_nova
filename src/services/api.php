
<?php
// Configuração de cabeçalhos para API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Se for requisição OPTIONS (preflight), finalizar aqui
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once 'database.php';

// Funções auxiliares
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode(['data' => $data, 'success' => true]);
    exit;
}

function sendError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message, 'success' => false]);
    exit;
}

// Obter o endpoint requisitado
$request_uri = $_SERVER['REQUEST_URI'];
$endpoint = trim(parse_url($request_uri, PHP_URL_PATH), '/');
$endpoint = str_replace('api/', '', $endpoint);

// Verificar se há parâmetros na URL
$parts = explode('/', $endpoint);
$resource = $parts[0];
$id = isset($parts[1]) ? $parts[1] : null;

// Obter o método HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Obter os dados enviados
$data = json_decode(file_get_contents('php://input'), true);

// Roteamento da API
switch ($resource) {
    case 'produtos':
        if ($method == 'GET') {
            if ($id) {
                // Buscar produto específico
                $stmt = executeQuery("SELECT * FROM products WHERE id = ? AND status = 'active'", [$id]);
                $product = $stmt->fetch();
                
                if (!$product) {
                    sendError('Produto não encontrado', 404);
                }
                
                sendResponse($product);
            } else {
                // Listar todos os produtos
                $stmt = executeQuery("SELECT * FROM products WHERE status = 'active'");
                $products = $stmt->fetchAll();
                sendResponse($products);
            }
        } elseif ($method == 'POST' && !$id) {
            // Criar novo produto
            if (!isset($data['name']) || empty($data['name'])) {
                sendError('Nome do produto é obrigatório');
            }
            
            $sql = "INSERT INTO products (name, description, price, image, sku, brand, category, status, 
                    cost_price, selling_price, stock, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            
            $params = [
                $data['name'],
                $data['description'] ?? '',
                $data['price'] ?? 0,
                $data['image'] ?? 'https://via.placeholder.com/300x300?text=Produto',
                $data['sku'] ?? '',
                $data['brand'] ?? '',
                $data['category'] ?? '',
                $data['status'] ?? 'active',
                $data['cost_price'] ?? 0,
                $data['selling_price'] ?? 0,
                $data['stock'] ?? 0
            ];
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt) {
                sendResponse(['id' => $pdo->lastInsertId()], 201);
            } else {
                sendError('Erro ao criar produto');
            }
        } elseif ($method == 'PUT' && $id) {
            // Atualizar produto existente
            $fields = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                // Converter camelCase para snake_case
                $dbField = preg_replace('/(?<!^)[A-Z]/', '_$0', $key);
                $dbField = strtolower($dbField);
                
                $fields[] = "$dbField = ?";
                $params[] = $value;
            }
            
            if (empty($fields)) {
                sendError('Nenhum campo para atualizar');
            }
            
            $params[] = $id;
            $sql = "UPDATE products SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Produto não encontrado ou nenhuma alteração feita', 404);
            }
        } elseif ($method == 'DELETE' && $id) {
            // Excluir produto (soft delete)
            $stmt = executeQuery("UPDATE products SET status = 'inactive', updated_at = NOW() WHERE id = ?", [$id]);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Produto não encontrado', 404);
            }
        } else {
            sendError('Método não permitido', 405);
        }
        break;
        
    case 'categorias':
        if ($method == 'GET') {
            if ($id) {
                // Buscar categoria específica
                $stmt = executeQuery("SELECT * FROM categories WHERE id = ? AND active = 1", [$id]);
                $category = $stmt->fetch();
                
                if (!$category) {
                    sendError('Categoria não encontrada', 404);
                }
                
                sendResponse($category);
            } else {
                // Listar todas as categorias
                $stmt = executeQuery("SELECT * FROM categories WHERE active = 1");
                $categories = $stmt->fetchAll();
                sendResponse($categories);
            }
        } elseif ($method == 'POST' && !$id) {
            // Criar nova categoria
            if (!isset($data['name']) || empty($data['name'])) {
                sendError('Nome da categoria é obrigatório');
            }
            
            $sql = "INSERT INTO categories (name, slug, description, icon_name, status, active, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, NOW())";
            
            $params = [
                $data['name'],
                $data['slug'] ?? strtolower(str_replace(' ', '-', $data['name'])),
                $data['description'] ?? '',
                $data['icon_name'] ?? 'pill',
                $data['status'] ?? 'active',
                isset($data['active']) ? (int)$data['active'] : 1
            ];
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt) {
                sendResponse(['id' => $pdo->lastInsertId()], 201);
            } else {
                sendError('Erro ao criar categoria');
            }
        } elseif ($method == 'PUT' && $id) {
            // Atualizar categoria existente
            $fields = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                if ($key == 'iconName') {
                    $fields[] = "icon_name = ?";
                } else {
                    // Converter camelCase para snake_case
                    $dbField = preg_replace('/(?<!^)[A-Z]/', '_$0', $key);
                    $dbField = strtolower($dbField);
                    
                    $fields[] = "$dbField = ?";
                }
                $params[] = $value;
            }
            
            if (empty($fields)) {
                sendError('Nenhum campo para atualizar');
            }
            
            $params[] = $id;
            $sql = "UPDATE categories SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Categoria não encontrada ou nenhuma alteração feita', 404);
            }
        } elseif ($method == 'DELETE' && $id) {
            // Excluir categoria (soft delete)
            $stmt = executeQuery("UPDATE categories SET active = 0, updated_at = NOW() WHERE id = ?", [$id]);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Categoria não encontrada', 404);
            }
        } else {
            sendError('Método não permitido', 405);
        }
        break;
        
    case 'marcas':
        if ($method == 'GET') {
            if ($id) {
                // Buscar marca específica
                $stmt = executeQuery("SELECT * FROM brands WHERE id = ? AND status = 'active'", [$id]);
                $brand = $stmt->fetch();
                
                if (!$brand) {
                    sendError('Marca não encontrada', 404);
                }
                
                sendResponse($brand);
            } else {
                // Listar todas as marcas
                $stmt = executeQuery("SELECT * FROM brands WHERE status = 'active'");
                $brands = $stmt->fetchAll();
                sendResponse($brands);
            }
        } elseif ($method == 'POST' && !$id) {
            // Criar nova marca
            if (!isset($data['name']) || empty($data['name'])) {
                sendError('Nome da marca é obrigatório');
            }
            
            $sql = "INSERT INTO brands (name, slug, description, logo_url, category, status, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, NOW())";
            
            $params = [
                $data['name'],
                $data['slug'] ?? strtolower(str_replace(' ', '-', $data['name'])),
                $data['description'] ?? '',
                $data['logo_url'] ?? null,
                $data['category'] ?? null,
                $data['status'] ?? 'active'
            ];
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt) {
                sendResponse(['id' => $pdo->lastInsertId()], 201);
            } else {
                sendError('Erro ao criar marca');
            }
        } elseif ($method == 'PUT' && $id) {
            // Atualizar marca existente
            $fields = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                // Converter camelCase para snake_case
                $dbField = preg_replace('/(?<!^)[A-Z]/', '_$0', $key);
                $dbField = strtolower($dbField);
                
                $fields[] = "$dbField = ?";
                $params[] = $value;
            }
            
            if (empty($fields)) {
                sendError('Nenhum campo para atualizar');
            }
            
            $params[] = $id;
            $sql = "UPDATE brands SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Marca não encontrada ou nenhuma alteração feita', 404);
            }
        } elseif ($method == 'DELETE' && $id) {
            // Excluir marca (soft delete)
            $stmt = executeQuery("UPDATE brands SET status = 'inactive', updated_at = NOW() WHERE id = ?", [$id]);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Marca não encontrada', 404);
            }
        } else {
            sendError('Método não permitido', 405);
        }
        break;
        
    case 'combos':
        if ($method == 'GET') {
            // Listar todos os combos
            $stmt = executeQuery("SELECT * FROM products WHERE is_combo = 1 AND status = 'active'");
            $combos = $stmt->fetchAll();
            sendResponse($combos);
        } else {
            sendError('Método não permitido', 405);
        }
        break;
        
    case 'clientes':
        if ($method == 'GET') {
            if ($id) {
                // Buscar cliente específico
                $stmt = executeQuery("SELECT * FROM customers WHERE id = ?", [$id]);
                $customer = $stmt->fetch();
                
                if (!$customer) {
                    sendError('Cliente não encontrado', 404);
                }
                
                sendResponse($customer);
            } else {
                // Listar todos os clientes
                $stmt = executeQuery("SELECT * FROM customers");
                $customers = $stmt->fetchAll();
                sendResponse($customers);
            }
        } elseif ($method == 'POST' && !$id) {
            // Criar novo cliente
            if (!isset($data['name']) || empty($data['name']) || !isset($data['email']) || empty($data['email'])) {
                sendError('Nome e email do cliente são obrigatórios');
            }
            
            $sql = "INSERT INTO customers (name, email, phone, status, created_at) 
                    VALUES (?, ?, ?, ?, NOW())";
            
            $params = [
                $data['name'],
                $data['email'],
                $data['phone'] ?? null,
                $data['status'] ?? 'active'
            ];
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt) {
                sendResponse(['id' => $pdo->lastInsertId()], 201);
            } else {
                sendError('Erro ao criar cliente');
            }
        } elseif ($method == 'PUT' && $id) {
            // Atualizar cliente existente
            $fields = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                // Converter camelCase para snake_case
                $dbField = preg_replace('/(?<!^)[A-Z]/', '_$0', $key);
                $dbField = strtolower($dbField);
                
                $fields[] = "$dbField = ?";
                $params[] = $value;
            }
            
            if (empty($fields)) {
                sendError('Nenhum campo para atualizar');
            }
            
            $params[] = $id;
            $sql = "UPDATE customers SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
            
            $stmt = executeQuery($sql, $params);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Cliente não encontrado ou nenhuma alteração feita', 404);
            }
        } elseif ($method == 'DELETE' && $id) {
            // Excluir cliente
            $stmt = executeQuery("DELETE FROM customers WHERE id = ?", [$id]);
            
            if ($stmt && $stmt->rowCount() > 0) {
                sendResponse(['id' => $id]);
            } else {
                sendError('Cliente não encontrado', 404);
            }
        } else {
            sendError('Método não permitido', 405);
        }
        break;
        
    default:
        sendError('Endpoint não encontrado', 404);
        break;
}
?>
