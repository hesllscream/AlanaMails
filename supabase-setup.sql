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

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (para las landing pages)
CREATE POLICY "Allow public read" ON prospects
  FOR SELECT USING (true);

-- Política para permitir operaciones solo a usuarios autenticados
CREATE POLICY "Allow authenticated operations" ON prospects
  FOR ALL USING (auth.role() = 'authenticated');
