using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;

public class RotinaHostedService : IHostedService, IDisposable
{
    private Timer _timer;
    private readonly HttpClient _httpClient;

    public RotinaHostedService()
    {
        _httpClient = new HttpClient();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(ExecuteTask, null, TimeSpan.Zero, TimeSpan.FromMinutes(14));
        return Task.CompletedTask;
    }

    private async void ExecuteTask(object state)
    {
        try
        {
            var response = await _httpClient.GetAsync("https://nova-api-controller.onrender.com/v1/public/rotina/");
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Requisição bem-sucedida!");
            }
            else
            {
                Console.WriteLine($"Falha na requisição. Status Code: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao chamar a URL: {ex.Message}");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
        _httpClient?.Dispose();
    }
}