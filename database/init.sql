-- PulseTriage Database Initialization

CREATE TABLE IF NOT EXISTS incidents (
  id SERIAL PRIMARY KEY,
  short_description VARCHAR(255) NOT NULL,
  detailed_description TEXT NOT NULL,
  category VARCHAR(50),
  affected_users INTEGER DEFAULT 1,
  environment VARCHAR(20) NOT NULL,
  user_role VARCHAR(50) NOT NULL,

  -- Triage outputs
  classified_category VARCHAR(50),
  impact VARCHAR(10),
  urgency VARCHAR(10),
  priority VARCHAR(5),
  assigned_team VARCHAR(100),

  -- Resolution
  status VARCHAR(20) DEFAULT 'New',
  auto_resolvable BOOLEAN DEFAULT false,
  suggested_article_id INTEGER,
  resolution_steps TEXT[],

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS knowledge_articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  keywords TEXT[] NOT NULL,
  description TEXT,
  resolution_steps TEXT[] NOT NULL,
  confidence DECIMAL(3,2) DEFAULT 0.85,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_priority ON incidents(priority);
CREATE INDEX idx_incidents_category ON incidents(classified_category);
CREATE INDEX idx_incidents_created ON incidents(created_at DESC);
CREATE INDEX idx_knowledge_category ON knowledge_articles(category);

-- Insert sample knowledge articles
INSERT INTO knowledge_articles (title, category, keywords, description, resolution_steps, confidence) VALUES
  ('Password Reset Procedure', 'ACCESS', ARRAY['password', 'reset', 'locked', 'login'], 'Standard password reset procedure for locked accounts',
   ARRAY['Navigate to account portal', 'Click "Forgot Password"', 'Verify identity via email/SMS', 'Set new password'], 0.92),

  ('VPN Connection Issues', 'NETWORK', ARRAY['vpn', 'connection', 'timeout', 'network'], 'Troubleshooting VPN connectivity problems',
   ARRAY['Check internet connection', 'Restart VPN client', 'Clear VPN cache', 'Verify credentials', 'Contact network team if issue persists'], 0.88),

  ('Application Crash Recovery', 'APPLICATION', ARRAY['crash', 'freeze', 'application', 'error'], 'Steps to recover from application crashes',
   ARRAY['Close the application completely', 'Clear application cache', 'Restart the application', 'Check for updates', 'Reinstall if problem continues'], 0.85),

  ('Database Connection Timeout', 'DATABASE', ARRAY['database', 'timeout', 'connection', 'query'], 'Resolving database connection timeout errors',
   ARRAY['Check database server status', 'Verify connection string', 'Review query performance', 'Increase timeout settings', 'Contact DBA team'], 0.87),

  ('Phishing Email Response', 'SECURITY', ARRAY['phishing', 'email', 'suspicious', 'malware'], 'Immediate actions for suspected phishing emails',
   ARRAY['Do NOT click any links', 'Do NOT download attachments', 'Forward to security@company.com', 'Delete the email', 'Change password if clicked'], 0.95),

  ('Access Permission Request', 'ACCESS', ARRAY['access', 'permission', 'denied', 'rights'], 'Requesting additional system access',
   ARRAY['Identify required access level', 'Submit access request form', 'Get manager approval', 'Wait for IAM team processing'], 0.90),

  ('Slow Network Performance', 'NETWORK', ARRAY['slow', 'network', 'performance', 'bandwidth'], 'Diagnosing slow network performance',
   ARRAY['Run speed test', 'Check for bandwidth-heavy applications', 'Restart router/modem', 'Contact network team with test results'], 0.84),

  ('Software Installation Request', 'APPLICATION', ARRAY['install', 'software', 'application', 'new'], 'Process for installing new software',
   ARRAY['Verify software is approved', 'Submit IT request ticket', 'Provide business justification', 'Wait for approval and installation'], 0.89);

-- Add a function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
