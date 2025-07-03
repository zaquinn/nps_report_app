using Microsoft.AspNetCore.Mvc;
using Nps.Application.DTOs;
using Nps.Application.Interfaces;
using Nps.Application.Services;
using Nps.Domain.Entities;

namespace Nps.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResponsesController(IResponseRepository repository) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(CreateResponseDto dto)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = new CustomerResponse
        {
            ProductName = dto.ProductName,
            Rating = dto.Rating,
            Comment = dto.Comment
        };

        await repository.AddAsync(response);
        return Created();
    }

    [HttpGet("report")]
    public async Task<IActionResult> GetReport()
    {
        var responses = await repository.GetAllAsync();
        var report = new ResponseReportDto
        {
            TotalResponses = responses.Count,
            Promoters = responses.Count(r => r.Rating >= 4),
            Detractors = responses.Count(r => r.Rating <= 2),
            Neutral = responses.Count(r => r.Rating == 3),
            NpsScore = NpsCalculator.Calculate(responses)
        };
        return Ok(report);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var responses = await repository.GetAllAsync();
        return Ok(responses);
    }
}