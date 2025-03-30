
<?php
/**
 * Arquivo de conexão com o banco de dados
 * Estabelece a conexão e fornece funções para consultas SQL
 */

// Incluir arquivo de configuração
require_once 'config.php';

// Função para registrar erros em arquivo de log
function logError($message, $sql = '', $params = []) {
    $logDir = __DIR__ . '/../logs';
    
    // Criar diretório de logs se não existir
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $logFile = $logDir . '/db_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    $paramsString = !empty($params) ? 'Parâmetros: ' . json_encode($params) : '';
    $sqlString = !empty($sql) ? 'SQL: ' . $sql : '';
    
    $logMessage = "[{$timestamp}] {$message}\n{$sqlString}\n{$paramsString}\n\n";
    
    // Escrever no arquivo de log
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}

// Estabelecer conexão com o banco de dados
try {
    $db_host = $config['db']['host'];
    $db_name = $config['db']['name'];
    $db_user = $config['db']['user'];
    $db_pass = $config['db']['pass'];
    $db_charset = $config['db']['charset'];
    $db_port = $config['db']['port'] ?? '3306';
    
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset={$db_charset}";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$db_charset} COLLATE {$db_charset}_unicode_ci"
    ];
    
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    
    // Verificar a conexão
    $pdo->query('SELECT 1');
    
} catch (PDOException $e) {
    // Registrar o erro em um arquivo de log
    logError('Erro de conexão com o banco de dados: ' . $e->getMessage());
    
    // Verificar se estamos em modo de depuração
    if ($config['app']['debug']) {
        die("Erro de conexão: " . $e->getMessage());
    } else {
        // Exibir mensagem genérica para o usuário em ambiente de produção
        die("Erro ao conectar com o banco de dados. Por favor, tente novamente mais tarde.");
    }
}

/**
 * Função para executar consultas SQL com prepared statements
 * 
 * @param string $sql Query SQL com placeholders para prepared statements
 * @param array $params Parâmetros para a query
 * @return PDOStatement|false Statement do PDO ou false em caso de erro
 */
function executeQuery($sql, $params = []) {
    global $pdo;
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        logError('Erro na execução da query: ' . $e->getMessage(), $sql, $params);
        
        global $config;
        if ($config['app']['debug']) {
            echo "Erro SQL: " . $e->getMessage();
            echo "<br>Query: " . $sql;
            echo "<br>Parâmetros: " . json_encode($params);
        }
        
        return false;
    }
}

/**
 * Função para obter um único registro
 * 
 * @param string $sql Query SQL
 * @param array $params Parâmetros para a query
 * @return array|null Resultado da consulta ou null em caso de falha
 */
function fetchOne($sql, $params = []) {
    $stmt = executeQuery($sql, $params);
    return $stmt ? $stmt->fetch() : null;
}

/**
 * Função para obter múltiplos registros
 * 
 * @param string $sql Query SQL
 * @param array $params Parâmetros para a query
 * @return array Resultados da consulta ou array vazio em caso de falha
 */
function fetchAll($sql, $params = []) {
    $stmt = executeQuery($sql, $params);
    return $stmt ? $stmt->fetchAll() : [];
}

/**
 * Função para inserir dados e retornar o ID gerado
 * 
 * @param string $table Nome da tabela
 * @param array $data Dados para inserir (campo => valor)
 * @return int|false ID do registro inserido ou false em caso de erro
 */
function insertAndGetId($table, $data) {
    global $pdo;
    
    try {
        $fields = array_keys($data);
        $placeholders = array_fill(0, count($fields), '?');
        
        $sql = "INSERT INTO {$table} (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $placeholders) . ")";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_values($data));
        
        return $pdo->lastInsertId();
    } catch (PDOException $e) {
        logError('Erro ao inserir em ' . $table . ': ' . $e->getMessage(), $sql, $data);
        return false;
    }
}
?>
