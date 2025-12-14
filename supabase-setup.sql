-- SQL para configurar las tablas en Supabase
-- Ejecutar este SQL en el SQL Editor de Supabase Dashboard

-- Tabla de prospectos (personas con nombre y plataforma personalizados)
CREATE TABLE IF NOT EXISTS prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL DEFAULT 'OnlyFans',
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsqueda rápida por slug
CREATE INDEX IF NOT EXISTS idx_prospects_slug ON prospects(slug);

-- Habilitar RLS (Row Level Security)
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Política para permitir TODAS las operaciones (lectura, escritura, borrado)
-- Esto permite que el panel admin funcione sin autenticación de Supabase
CREATE POLICY "Allow all operations" ON prospects
  FOR ALL USING (true) WITH CHECK (true);
