
<?php
// Arquivo de conexão com o banco de dados
require_once 'config.php';

// Estabelecer conexão com o banco de dados
try {
    $db_host = $config['db']['host'];
    $db_name = $config['db']['name'];
    $db_user = $config['db']['user'];
    $db_pass = $config['db']['pass'];
    $db_charset = $config['db']['charset'];
    
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    
} catch (PDOException $e) {
    // Registrar o erro em um arquivo de log
    error_log('Erro de conexão com o banco de dados: ' . $e->getMessage());
    // Exibir mensagem genérica para o usuário em ambiente de produção
    die("Erro ao conectar com o banco de dados. Por favor, tente novamente mais tarde.");
}

// Função para executar consultas com prepared statements
function executeQuery($sql, $params = []) {
    global $pdo;
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        error_log('Erro na execução da query: ' . $e->getMessage());
        return false;
    }
}
?>
