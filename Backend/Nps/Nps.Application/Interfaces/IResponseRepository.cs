using Nps.Domain.Entities;

namespace Nps.Application.Interfaces;

public interface IResponseRepository
{
    Task AddAsync(CustomerResponse response);
    Task<List<CustomerResponse>> GetAllAsync();
}