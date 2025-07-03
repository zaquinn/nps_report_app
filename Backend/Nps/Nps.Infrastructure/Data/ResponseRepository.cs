using Microsoft.EntityFrameworkCore;
using Nps.Application.Interfaces;
using Nps.Domain.Entities;

namespace Nps.Infrastructure.Data;

public class ResponseRepository : IResponseRepository
{
    private readonly AppDbContext _context;

    public ResponseRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(CustomerResponse response)
    {
        _context.Responses.Add(response);
        await _context.SaveChangesAsync();
    }

    public Task<List<CustomerResponse>> GetAllAsync()
        => _context.Responses.ToListAsync();
}