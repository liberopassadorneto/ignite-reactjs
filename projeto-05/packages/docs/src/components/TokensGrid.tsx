interface TokensGridProps {
  tokens: Record<string, string>;
}

export function TokensGrid({ tokens }: TokensGridProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
        </tr>
      </thead>
    </table>
  );
}
