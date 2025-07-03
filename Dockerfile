FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Backend/Nps/Nps.API/Nps.API.csproj", "Backend/Nps/Nps.API/"]
COPY ["Backend/Nps/Nps.Infrastructure/Nps.Infrastructure.csproj", "Backend/Nps/Nps.Infrastructure/"]
COPY ["Backend/Nps/Nps.Domain/Nps.Domain.csproj", "Backend/Nps/Nps.Domain/"]
RUN dotnet restore "Backend/Nps/Nps.API/Nps.API.csproj"
COPY . .

WORKDIR "/src/Backend/Nps/Nps.API"
RUN dotnet build "Nps.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Nps.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Nps.API.dll"]