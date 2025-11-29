# MongoDB

## Overview

MongoDB is a popular NoSQL document database that stores data in flexible, JSON-like documents. It's designed for modern application development and is particularly well-suited for SaaS and AI-driven products that require flexible schemas, horizontal scaling, and rapid iteration.

**Type**: NoSQL Document Database  
**License**: Server Side Public License (SSPL) / Commercial  
**Primary Language**: C++  
**Founded**: 2007  
**Website**: [mongodb.com](https://www.mongodb.com)

---

## What is MongoDB?

MongoDB is a document-oriented database that uses collections and documents instead of tables and rows (like traditional SQL databases). Documents are stored in BSON (Binary JSON) format, making it natural for developers working with JavaScript, Python, and other modern languages.

### Key Characteristics

- **Document-Based**: Data stored as documents (similar to JSON objects)
- **Schema-Flexible**: No fixed schema required - documents can have different structures
- **Horizontally Scalable**: Built for distributed systems and cloud deployment
- **Rich Query Language**: Powerful querying capabilities with indexing
- **ACID Transactions**: Full transaction support (since version 4.0)

---

## Optimal Use Cases

### ✅ Best For

1. **Content Management Systems**
   - Blog platforms
   - CMS applications
   - Document storage systems

2. **Real-Time Analytics**
   - IoT data collection
   - Time-series data
   - Event logging

3. **User Profiles & Personalization**
   - User preference storage
   - Shopping carts
   - Session data

4. **AI/ML Applications**
   - Storing unstructured data
   - Vector embeddings storage (Atlas Vector Search)
   - Training data management
   - Model metadata storage

5. **SaaS Applications**
   - Multi-tenant applications
   - Flexible data models
   - Rapid prototyping

6. **Mobile Applications**
   - Offline-first apps
   - Sync capabilities
   - Flexible data structures

7. **Catalogs & Product Data**
   - E-commerce platforms
   - Product catalogs with varying attributes
   - Inventory management

### ❌ Not Ideal For

1. **Complex Transactions**
   - Financial systems requiring strict ACID compliance
   - Banking applications
   - High-frequency trading systems

2. **Heavy Relational Data**
   - Systems with many complex joins
   - Data warehouses
   - Reporting systems requiring SQL

3. **Small, Simple Applications**
   - Overkill for simple CRUD apps
   - Static websites
   - Basic blogs

---

## Architecture & Core Concepts

### Document Structure

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "orders": [
    { "product": "Laptop", "price": 999.99 },
    { "product": "Mouse", "price": 29.99 }
  ],
  "created_at": ISODate("2024-01-15T10:30:00Z")
}
```

### Collections vs Tables

- **SQL**: Tables with fixed schemas
- **MongoDB**: Collections with flexible document structures

### Key Features

1. **Indexing**: Supports various index types (single, compound, text, geospatial, etc.)
2. **Aggregation Pipeline**: Powerful data processing framework
3. **Replication**: Automatic failover with replica sets
4. **Sharding**: Horizontal scaling across multiple servers
5. **Atlas Vector Search**: Native vector search for AI applications

---

## MongoDB Atlas (Cloud Service)

MongoDB Atlas is the fully-managed cloud database service that provides:

- **Automated Backups**: Point-in-time recovery
- **Auto-Scaling**: Automatic resource adjustment
- **Global Clusters**: Multi-region deployment
- **Security**: Encryption at rest and in transit
- **Monitoring**: Built-in performance monitoring
- **Vector Search**: AI-powered semantic search
- **Data Lake**: Analytics and data warehousing

### Pricing Tiers

- **Free Tier**: 512MB storage, shared resources (great for learning)
- **M0**: Free tier with limitations
- **M2-M80**: Production tiers with dedicated resources
- **Serverless**: Pay-per-use model

---

## Comparison with Alternatives

### MongoDB vs PostgreSQL

| Feature | MongoDB | PostgreSQL |
|---------|---------|------------|
| **Type** | NoSQL Document | SQL Relational |
| **Schema** | Flexible | Fixed |
| **Scaling** | Horizontal (sharding) | Vertical (better) |
| **Query Language** | MongoDB Query Language | SQL |
| **Use Case** | Rapid development, flexible data | Complex relationships, ACID |
| **JSON Support** | Native | Good (JSONB) |

**Choose MongoDB when**: You need flexible schemas, rapid iteration, or horizontal scaling.  
**Choose PostgreSQL when**: You need complex joins, strict ACID compliance, or SQL expertise.

### MongoDB vs Firebase/Firestore

| Feature | MongoDB | Firebase/Firestore |
|---------|---------|-------------------|
| **Deployment** | Self-hosted or Atlas | Fully managed (Google) |
| **Real-time** | Change streams | Built-in real-time |
| **Offline** | Manual sync | Automatic offline |
| **Pricing** | More predictable | Pay-per-operation |
| **Scalability** | Enterprise-grade | Good for startups |
| **Query Power** | More flexible | Limited but simple |

**Choose MongoDB when**: You need more control, complex queries, or enterprise features.  
**Choose Firestore when**: You need real-time sync, offline-first, or rapid prototyping.

### MongoDB vs DynamoDB

| Feature | MongoDB | DynamoDB |
|---------|---------|----------|
| **Provider** | MongoDB Inc. | AWS |
| **Pricing** | Predictable | Pay-per-request |
| **Query Flexibility** | Very flexible | Limited |
| **Scaling** | Manual/auto | Automatic |
| **Multi-cloud** | Yes | AWS only |
| **Learning Curve** | Moderate | Steep |

**Choose MongoDB when**: You need query flexibility, multi-cloud, or predictable costs.  
**Choose DynamoDB when**: You're all-in on AWS and need automatic scaling.

---

## Integration with AI Products

### Vector Search for AI

MongoDB Atlas Vector Search enables:

- **Semantic Search**: Find similar documents by meaning
- **RAG (Retrieval Augmented Generation)**: Combine LLMs with your data
- **Embedding Storage**: Store vector embeddings efficiently
- **Hybrid Search**: Combine vector and keyword search

### Example Use Case: AI Chatbot

```javascript
// Store conversation context
{
  "user_id": "123",
  "messages": [
    { "role": "user", "content": "What's the weather?" },
    { "role": "assistant", "content": "I'll check that for you..." }
  ],
  "embeddings": [0.1, 0.2, 0.3, ...], // Vector embedding
  "metadata": {
    "session_id": "abc",
    "timestamp": ISODate("2024-01-15T10:30:00Z")
  }
}
```

### AI-Specific Features

1. **Atlas Vector Search**: Native vector similarity search
2. **Change Streams**: Real-time data updates for AI pipelines
3. **Aggregation Pipeline**: Complex data transformations for ML
4. **Time Series Collections**: Optimized for time-series ML data

---

## Getting Started

### Installation

**Local Installation:**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**MongoDB Atlas (Recommended for Production):**
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Connect from your application

### Basic Usage (Node.js)

```javascript
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db('myapp');
    const collection = db.collection('users');
    
    // Insert
    await collection.insertOne({
      name: 'John Doe',
      email: 'john@example.com'
    });
    
    // Find
    const user = await collection.findOne({ email: 'john@example.com' });
    console.log(user);
    
    // Update
    await collection.updateOne(
      { email: 'john@example.com' },
      { $set: { lastLogin: new Date() } }
    );
  } finally {
    await client.close();
  }
}

main().catch(console.error);
```

---

## Performance Considerations

### Indexing Strategy

- **Create indexes** on frequently queried fields
- **Compound indexes** for multi-field queries
- **Text indexes** for search functionality
- **TTL indexes** for time-based data expiration

### Best Practices

1. **Schema Design**: Denormalize when reads > writes
2. **Connection Pooling**: Reuse connections
3. **Projection**: Only fetch needed fields
4. **Aggregation**: Use aggregation pipeline for complex queries
5. **Sharding**: Plan shard key strategy early
6. **Monitoring**: Use Atlas monitoring or tools like MongoDB Compass

---

## Security Features

1. **Authentication**: Username/password, LDAP, X.509 certificates
2. **Authorization**: Role-based access control (RBAC)
3. **Encryption**: At rest and in transit (TLS/SSL)
4. **Network Security**: IP whitelisting, VPC peering
5. **Audit Logging**: Track all database operations

---

## When to Choose MongoDB

### ✅ Choose MongoDB If:

- Building SaaS with flexible data models
- Need rapid development and iteration
- Working with unstructured or semi-structured data
- Building AI/ML applications with vector search needs
- Requiring horizontal scaling
- Using JavaScript/Node.js ecosystem
- Need multi-cloud deployment options

### ❌ Consider Alternatives If:

- Heavy relational data with complex joins
- Strict ACID requirements for financial systems
- Small, simple applications (SQLite might suffice)
- Team has strong SQL expertise and needs SQL features
- Budget constraints (PostgreSQL is free and powerful)

---

## Resources

- **Documentation**: [docs.mongodb.com](https://docs.mongodb.com)
- **University**: [university.mongodb.com](https://university.mongodb.com) (Free courses)
- **Atlas**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Community**: [community.mongodb.com](https://community.mongodb.com)
- **Compass**: GUI tool for MongoDB

---

## Summary

MongoDB is an excellent choice for modern SaaS and AI applications that require flexibility, scalability, and rapid development. Its document model aligns well with modern application architectures, and MongoDB Atlas provides enterprise-grade features with minimal operational overhead. For AI applications, the native vector search capabilities make it particularly compelling for RAG and semantic search use cases.

**Best For**: SaaS platforms, AI/ML applications, content management, real-time analytics, rapid prototyping  
**Not Ideal For**: Complex relational data, strict financial transactions, simple static applications

