# NPS (Net Promoter Score) Application

A full-stack application for collecting and analyzing Net Promoter Score feedback, built with a modern tech stack featuring a .NET 9 backend API and Next.js frontend.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Backend (.NET API)](#backend-net-api)
  - [Architecture](#architecture)
  - [Key Features](#key-features)
- [NPS Calculator Logic](#nps-calculator-logic)
- [Frontend (Next.js)](#frontend-nextjs)
  - [Features](#features)
  - [Components](#components)
- [Database](#database)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker (Recommended)](#running-with-docker-recommended)
  - [Running without Docker](#running-without-docker)
- [API Documentation](#api-documentation)

## Overview

This NPS application allows organizations to collect customer feedback through a simple rating system (0-10 scale) and provides analytics to track customer satisfaction trends. The system categorizes responses into Detractors (0-6), Passives (7-8), and Promoters (9-10) to calculate the Net Promoter Score.

## Technologies Used

### Backend
- **.NET 9** - Modern web API framework
- **ASP.NET Core** - Web API development
- **Entity Framework Core 9.0.6** - ORM for database operations
- **PostgreSQL** - Primary database
- **Npgsql** - PostgreSQL provider for Entity Framework
- **Swagger/OpenAPI** - API documentation
- **Clean Architecture** - Separation of concerns with Domain, Application, Infrastructure layers

### Frontend
- **Next.js 15.3.4** - React framework with SSR/SSG capabilities
- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL 17** - Database container

## Project Structure

```
├── Backend/
│   └── Nps/
│       ├── Nps.API/          # Web API layer
│       ├── Nps.Application/   # Application services and DTOs
│       ├── Nps.Domain/        # Domain entities and business logic
│       └── Nps.Infrastructure/ # Data access and external services
├── frontend/                  # Next.js application
├── docker-compose.yml         # Multi-container setup
└── Dockerfile                # Backend containerization
```

## Backend (.NET API)

### Architecture

The backend follows **Clean Architecture** principles with clear separation of concerns across four distinct layers:

- **Nps.Domain**: Contains core business entities (`CustomerResponse`), enums (`NpsCategory`), and domain logic. This layer has no dependencies on external frameworks.
- **Nps.Application**: Houses application services, DTOs (`CreateResponseDto`, `ResponseReportDto`), interfaces (`IResponseRepository`), and business logic services (`NpsCalculator`). Defines contracts for infrastructure.
- **Nps.Infrastructure**: Implements data access patterns, Entity Framework Core configurations, database migrations, and external service integrations. Contains the concrete implementation of repository interfaces.
- **Nps.API**: Web API controllers (`ResponseController`), dependency injection configuration, and HTTP request/response handling. This is the entry point for the application.

This architecture ensures:
- **Dependency Inversion**: Inner layers don't depend on outer layers
- **Testability**: Business logic is isolated and easily testable
- **Maintainability**: Clear separation of concerns makes the codebase easier to maintain
- **Flexibility**: Easy to swap implementations without affecting business logic

### Key Features

- RESTful API for NPS data management
- Entity Framework Core with PostgreSQL integration
- Clean Architecture implementation with proper layer separation
- Swagger documentation for API endpoints
- Docker containerization ready
- SOLID principles implementation

## NPS Calculator Logic

The core business logic of the application resides in the `NpsCalculator` class, which implements the standard Net Promoter Score calculation algorithm.

### Calculate Method

The `Calculate` method in the `NpsCalculator` class processes customer responses and computes the NPS score using the following logic:

```csharp
public static double Calculate(List<CustomerResponse> responses)
{
    if (responses.Count == 0) return 0;

    var promoters = responses.Count(r => r.Rating >= 4);
    var detractors = responses.Count(r => r.Rating <= 2);
    var nps = ((double)(promoters - detractors) / responses.Count) * 100;
    return Math.Round(nps, 2);
}
```

### Algorithm Breakdown

1. **Input Validation**: Returns 0 if no responses are provided
2. **Customer Categorization**:
   - **Promoters**: Customers with ratings ≥ 4 (satisfied customers)
   - **Detractors**: Customers with ratings ≤ 2 (unsatisfied customers)
   - **Passives**: Customers with rating = 3 (neutral, not counted in calculation)

3. **NPS Formula**: 
   ```
   NPS = ((Promoters - Detractors) / Total Responses) × 100
   ```

4. **Result**: Returns the score rounded to 2 decimal places

### Score Interpretation

- **Score Range**: -100 to +100
- **Excellent**: 70 to 100
- **Good**: 50 to 69
- **Acceptable**: 0 to 49
- **Needs Improvement**: -100 to -1

This implementation follows the industry-standard NPS calculation methodology, providing accurate customer satisfaction metrics for business intelligence and decision-making.

## Frontend (Next.js)

### Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety across the application
- **Component-Based**: Reusable React components
- **Analytics Dashboard**: Visual representation of NPS data
- **Form Handling**: User-friendly NPS submission forms

### Components

- `NPSForm`: Customer feedback submission
- `NPSList`: Display of collected responses
- `AnalyticsCharts`: Data visualization and metrics
- `Navigation`: Application navigation

## Database

- **PostgreSQL 17** database
- **Entity Framework Core** migrations
- Stores customer responses and metadata
- Optimized for NPS calculations and reporting

## Getting Started

### Prerequisites

#### For Docker (Recommended)
- Docker
- Docker Compose

#### For Local Development
- .NET 9 SDK
- Node.js 22 or later
- PostgreSQL 17
- npm or yarn

### Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TesteTecnico
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Swagger Documentation: http://localhost:8080/swagger

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Running without Docker

#### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd Backend/Nps
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Set up PostgreSQL**
   - Install PostgreSQL 17
   - Create database: `npsdb`
   - Update connection string in `appsettings.json`

4. **Run database migrations**
   ```bash
   cd Nps.API
   dotnet ef database update
   ```

5. **Start the API**
   ```bash
   dotnet run
   ```

   API will be available at: http://localhost:5000

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL** (if needed)
   Update `NEXT_PUBLIC_API_URL` in your environment or configuration

4. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:3000

5. **For production build**
   ```bash
   npm run build
   npm start
   ```

## API Documentation

When the backend is running, visit `/swagger` endpoint to explore the API:
- Local: http://localhost:8080/swagger
- Interactive API documentation
- Test endpoints directly from the browser

---

**Built with ❤️ using .NET 9, Next.js, and PostgreSQL**
